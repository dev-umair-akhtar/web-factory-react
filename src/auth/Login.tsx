import {
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { initialFeedback } from "../utilities/constants";
import { AppContext } from "../utilities/context/AppContext";

const initialCreds: UserCredentials = {
    username: "",
    password: "",
    client: "",
};

const Login = () => {
    const [creds, setCreds] = useState(initialCreds);
    const theme = useTheme();
    const { feedback, setFeedback, setUser, userType, setUserType } =
        useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const change = { [name]: value };

        setCreds((currState) => ({ ...currState, ...change }));
    };

    async function loginUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setFeedback((fb) => ({ ...fb, loading: true }));

        const { res, err } = await UserService.getInstance().loginUser(creds);

        if (res?.user) {
            setUser(() => res.user);
            setUserType(() => res.user.baseUser.type);

            setFeedback({
                loading: false,
                show: true,
                message: res.message,
                severity: "success",
            });

            userType === "superadmin" ? navigate("/mis") : navigate("/");
        }

        if (err) {
            console.log("Login Error : ", err);

            setFeedback({
                loading: false,
                show: true,
                message: err as string,
                severity: "error",
            });
        }
    }

    useEffect(() => {
        return () => setFeedback(initialFeedback);
    }, []);

    return (
        <form style={{ width: "100%" }} onSubmit={loginUser}>
            <Grid container flexDirection="column" spacing={2}>
                <Grid item>
                    <TextField
                        fullWidth
                        placeholder="Token"
                        name="client"
                        value={creds.client}
                        onChange={handleChange}
                        type="number"
                        sx={{
                            "& input[type=number]::-webkit-outer-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },

                            "& input[type=number]::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                        }}
                        inputProps={{ min: 1 }}
                        InputProps={{
                            startAdornment: (
                                <Typography
                                    color={theme.palette.action.disabled}
                                    mr={0.5}
                                    whiteSpace="nowrap"
                                >
                                    ZS -
                                </Typography>
                            ),
                        }}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        fullWidth
                        placeholder="Username"
                        name="username"
                        value={creds.username}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        fullWidth
                        placeholder="Password"
                        name="password"
                        value={creds.password}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item>
                    <Button component={Link} to="/auth/superadmin">
                        super admin login
                    </Button>
                </Grid>

                <Grid item>
                    <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        type="submit"
                        disabled={feedback.loading}
                        startIcon={
                            feedback.loading && (
                                <CircularProgress size={theme.spacing(2)} />
                            )
                        }
                    >
                        {feedback.loading ? "loggin in..." : "login"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Login;
