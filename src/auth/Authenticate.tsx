import { CircularProgress } from "@mui/material";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { AppContext } from "../utilities/context/AppContext";

type Props = { children: ReactElement; then?: string };

const LoadingUI = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress />
        </div>
    );
};

export default function Authenticate({ children, then }: Props) {
    const [content, setContent] = useState(<LoadingUI />);
    const { setUser, userType, setUserType } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    const loginOrRedirect = async () => {
        const { res } = await UserService.getInstance().isLoggedIn();

        if (res?.logged) {
            setUser(res.user);
            setUserType(res.user.baseUser.type);

            if (then) {
                navigate(then);
            } else {
                // setContent(cloneElement(children, { ...props }));
                setContent(children);
            }
        } else {
            userType === "superadmin" ? navigate("/mis") : navigate(`/auth`);
        }
    };

    useEffect(() => {
        loginOrRedirect();
    }, [location.pathname]);

    return content;
}
