import {
    DarkMode,
    LightMode,
    Logout,
    Menu as MenuIcon,
    Person,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useTheme,
} from "@mui/material";
import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";
import { AppContext } from "../utilities/context/AppContext";

const Navbar = () => {
    const theme = useTheme();
    const { theme: themeMode, setTheme, pageTitle } = useContext(AppContext);

    return (
        <Box
            component="nav"
            // py={1}
            position="sticky"
            top={0}
            // borderBottom={`1px solid ${theme.palette.divider}`}
            zIndex={theme.zIndex.appBar}
            bgcolor={theme.palette.background.default}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Box display="flex" alignItems="center">
                <Box
                    bgcolor={theme.palette.action.hover}
                    borderRight={`1px solid ${theme.palette.divider}`}
                    width={theme.spacing(30)}
                    py={1}
                >
                    <ListItem>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>

                        <ListItemText
                            primaryTypographyProps={{
                                textTransform: "uppercase",
                                letterSpacing: 4,
                                fontWeight: "bold",
                            }}
                        >
                            <span style={{ color: theme.palette.primary.main }}>
                                zama
                            </span>
                            school
                        </ListItemText>
                    </ListItem>
                </Box>

                <Typography
                    ml={2}
                    textTransform="uppercase"
                    color="primary"
                    variant="h5"
                    letterSpacing={1}
                >
                    {pageTitle}
                </Typography>
            </Box>

            <Box
                pr={1}
                py={1}
                display="flex"
                // borderBottom={`1px solid ${theme.palette.divider}`}
            >
                <IconButton
                    onClick={
                        themeMode === "dark"
                            ? () => setTheme("light")
                            : () => setTheme("dark")
                    }
                >
                    {themeMode === "dark" ? <LightMode /> : <DarkMode />}
                </IconButton>

                <UserMenu />
            </Box>
        </Box>
    );
};

export default Navbar;

const UserMenu = () => {
    const [menu, setMenu] = useState<{
        open: boolean;
        anchor: null | HTMLElement;
    }>({ open: false, anchor: null });
    const theme = useTheme();
    const { setUser, setUserType } = useContext(AppContext);
    const navigate = useNavigate();

    function handleMenu(e: MouseEvent<HTMLButtonElement>) {
        setMenu({ open: !menu.open, anchor: e.currentTarget });
    }

    const handleLogout = async () => {
        const [data] = await UserService.getInstance().logoutUser();

        if (data) {
            setUser(null);
            setUserType(null);

            navigate("/auth");
        }
    };

    return (
        <Box>
            <IconButton
                onClick={handleMenu}
                sx={
                    menu.open
                        ? {
                              bgcolor: theme.palette.action.selected,
                          }
                        : undefined
                }
            >
                <Person />
            </IconButton>

            <Menu
                open={menu.open}
                anchorEl={menu.anchor}
                onClose={() => setMenu({ ...menu, open: false })}
                sx={{ mt: 1 }}
            >
                <MenuItem
                    sx={{ minWidth: theme.spacing(30) }}
                    onClick={handleLogout}
                >
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>

                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
};
