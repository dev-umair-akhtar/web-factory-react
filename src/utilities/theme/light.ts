import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: orange[700] },
    },
});
