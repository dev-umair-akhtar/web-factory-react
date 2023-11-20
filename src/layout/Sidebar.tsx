import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    useTheme,
} from "@mui/material";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Module } from "../types";

type Props = { modules: Module[] };

const Sidebar = ({ modules: mods }: Props) => {
    const [expandedModule, setExpandedModule] = useState("");
    const theme = useTheme();

    return (
        <Box
            component="aside"
            minWidth={theme.spacing(30)}
            maxHeight={`calc(100vh - ${theme.spacing(8)})`}
            overflow="auto"
            borderRight={`1px solid ${theme.palette.divider}`}
            bgcolor={theme.palette.action.hover}
        >
            <List disablePadding sx={{ height: "100%" }}>
                {mods.map((module) =>
                    module.subModules?.length ? (
                        // Module with sub modules
                        <Fragment key={module.id}>
                            <ListItemButton
                                onClick={() =>
                                    expandedModule !== module.name
                                        ? setExpandedModule(module.name)
                                        : setExpandedModule("")
                                }
                            >
                                <ListItemIcon>
                                    {module.icon && <module.icon.outlined />}
                                </ListItemIcon>

                                <ListItemText>{module.name}</ListItemText>

                                <ListItemSecondaryAction>
                                    <IconButton disableRipple>
                                        {expandedModule === module.name ? (
                                            <ExpandLess color="primary" />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItemButton>

                            <Collapse
                                in={expandedModule === module.name}
                                sx={{
                                    bgcolor: theme.palette.action.hover,
                                }}
                            >
                                <List dense>
                                    {module.subModules.map((subMod) => (
                                        <ListItemButton key={subMod.id}>
                                            <ListItemIcon></ListItemIcon>

                                            <ListItemText>
                                                {subMod.name}
                                            </ListItemText>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </Fragment>
                    ) : (
                        // Single Module
                        <Link
                            key={module.id}
                            to={module.url!}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItemButton
                                selected={location.pathname === module.url}
                                href={module.url!}
                                sx={{
                                    borderRight:
                                        location.pathname === module.url
                                            ? `1px solid ${theme.palette.primary.main}`
                                            : undefined,
                                }}
                            >
                                <ListItemIcon>
                                    {module.icon &&
                                        (location.pathname === module.url ? (
                                            <module.icon.filled color="primary" />
                                        ) : (
                                            <module.icon.outlined />
                                        ))}
                                </ListItemIcon>

                                <ListItemText>{module.name}</ListItemText>
                            </ListItemButton>
                        </Link>
                    )
                )}
            </List>
        </Box>
    );
};

export default Sidebar;
