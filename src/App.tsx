import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authenticate from "./auth/Authenticate";
import Login from "./auth/Login";
import SingUp from "./auth/SingUp";
import SuperUserLogin from "./auth/SuperUserLogin";
import ClientsPage from "./features/client/ClientsPage";
import Role from "./features/role/RolesPage";
import SuperadminsPage from "./features/user/SuperadminsPage";
import User from "./features/user/UsersPage";
import Auth from "./layout/Auth";
import Dashboard from "./layout/Dashboard";
import { ThemeMode } from "./types";
import { initialFeedback } from "./utilities/constants";
import { AppContext } from "./utilities/context/AppContext";
import { darkTheme } from "./utilities/theme/dark";
import { lightTheme } from "./utilities/theme/light";

const App = () => {
    const [themeMode, setActiveThemeMode] = useState<ThemeMode>("dark");
    const [feedback, setFeedback] = useState(initialFeedback);
    const [userType, setUserType] = useState<UserType | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [pageTitle, setPageTitle] = useState("dashboard");

    return (
        <AppContext.Provider
            value={{
                feedback,
                setFeedback,
                pageTitle,
                setPageTitle,
                user,
                setUser,
                userType,
                setUserType,
                theme: themeMode,
                setTheme: setActiveThemeMode,
            }}
        >
            <ThemeProvider
                theme={themeMode === "dark" ? darkTheme : lightTheme}
            >
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Authenticate>
                                    <Dashboard />
                                </Authenticate>
                            }
                        >
                            <Route
                                index
                                element={
                                    <>
                                        <Typography>admin dashboard</Typography>
                                    </>
                                }
                            />

                            <Route path="mis">
                                <Route
                                    index
                                    element={
                                        <Typography>
                                            super admin dashboard
                                        </Typography>
                                    }
                                />

                                <Route
                                    path="superadmin"
                                    element={<SuperadminsPage />}
                                />

                                <Route path="role" element={<Role />} />

                                <Route
                                    path="client"
                                    element={<ClientsPage />}
                                />
                            </Route>

                            <Route path="role" element={<Role />} />
                            <Route path="user" element={<User />} />
                        </Route>

                        <Route path="/auth" element={<Auth />}>
                            <Route index element={<Login />} />
                            <Route
                                path="superadmin"
                                element={<SuperUserLogin />}
                            />
                            <Route path="sign-up" element={<SingUp />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AppContext.Provider>
    );
};

export default App;
