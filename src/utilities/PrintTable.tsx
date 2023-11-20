import { Print } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const PrintTable = ({ componentRef, setPrintMode, sx }: any) => {
    const triggerRef = useRef<any>(null);
    const handlePrint = () => {
        setPrintMode(true);
        setTimeout(() => {
            triggerRef.current?.click();
            setPrintMode(false);
        }, 1000);
    };
    return (
        <>
            <ReactToPrint
                trigger={() => <section hidden ref={triggerRef} />}
                content={() => componentRef.current}
            />
            <IconButton onClick={handlePrint} sx={sx}>
                <Print />
            </IconButton>
        </>
    );
};

export default PrintTable;
