import { Box, BoxProps, useTheme } from "@mui/material";
import { ReactElement } from "react";

type Props = { children: ReactElement; props?: BoxProps };

const Page = ({ children, ...props }: Props) => {
    const theme = useTheme();

    return (
        <Box
            maxHeight={`calc(100% - ${theme.spacing(8.25)})`}
            overflow="auto"
            p={1.5}
            {...props}
        >
            {children}
        </Box>
    );
};

export default Page;
