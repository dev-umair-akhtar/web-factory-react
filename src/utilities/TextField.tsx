import { TextField as MUITextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps;

const TextField = (props: Props) => {
    return <MUITextField size="small" {...props} />;
};

export default TextField;
