import {
    Alert,
    Button,
    CircularProgress,
    Grid,
    TextField,
    useTheme,
} from "@mui/material";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { AppContext } from "../utilities/context/AppContext";

const initialCreds = {
    client: "",
    username: "",
    password: "",
};

const SuperUserLogin = () => {
    const [creds, setCreds] = useState(initialCreds);
    const theme = useTheme();
    const { feedback, setFeedback, setUser, setUserType } =
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

        console.log("Login response : ", res);

        if (res?.user.id) {
            setUser(() => res.user);
            setUserType(() => res.user.baseUser.type);

            setFeedback({
                loading: false,
                show: true,
                message: res.message,
                severity: "success",
            });

            navigate("/mis");
        } else {
            console.log("Login Error : ", err);

            setFeedback({
                loading: false,
                show: true,
                message: err!,
                severity: "error",
            });
        }
    }

    return (
        <form style={{ width: "100%" }} onSubmit={loginUser}>
            <Grid container flexDirection="column" spacing={2}>
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

                {feedback.show && (
                    <Grid item>
                        <Alert
                            severity={feedback.severity}
                            onClose={() =>
                                setFeedback((f) => ({ ...f, show: false }))
                            }
                        >
                            {feedback.message}
                        </Alert>
                    </Grid>
                )}
            </Grid>
        </form>
    );
};

export default SuperUserLogin;
