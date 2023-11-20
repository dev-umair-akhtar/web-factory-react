import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const Auth = () => {
    return (
        <Grid container minHeight="100vh">
            <Grid
                item
                xs={0}
                md={6}
                lg={7}
                // bgcolor={theme.palette.common.black}
            ></Grid>

            <Grid
                item
                xs={12}
                md={6}
                lg={5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                // bgcolor={theme.palette.common.black}
                px={12}
            >
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default Auth;
