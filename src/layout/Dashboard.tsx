import { Alert, Box, LinearProgress, Slide, Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserService } from "../services/UserService";
import { Module, Modules } from "../types";
import { AppContext } from "../utilities/context/AppContext";
import { modules } from "../utilities/modules";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [mods, setMods] = useState<Module[]>([]);
    const { feedback, setFeedback, userType } = useContext(AppContext);

    async function isLogged() {
        const res = await UserService.getInstance().isLoggedIn();

        console.log(res);
    }

    useEffect(() => {
        if (userType) {
            setMods(modules[userType as keyof Modules]);
        }
    }, [userType]);

    useEffect(() => {
        isLogged();
    }, []);

    return (
        <Box
            height="100vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
        >
            {feedback.loading && <LinearProgress />}

            <Navbar />

            <Box flex={1} display="flex" height="100%">
                <Sidebar modules={mods} />

                <Box flex={1} overflow="auto">
                    <Outlet />
                </Box>
            </Box>

            <Snackbar
                open={feedback.show}
                onClose={() => setFeedback((f) => ({ ...f, show: false }))}
                autoHideDuration={7000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                TransitionComponent={Slide}
            >
                <Alert severity={feedback.severity}>{feedback.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
