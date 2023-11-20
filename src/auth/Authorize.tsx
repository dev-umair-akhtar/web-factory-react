import { useContext } from "react";
import { AppContext } from "../utilities/context/AppContext";

interface Props {
    children: any;
    opName?: string;
    fallback?: JSX.Element | null;
}

export default function Authorize({
    children,
    opName,
    fallback = null,
}: Props) {
    const { user } = useContext(AppContext);

    if (user && opName && user?.baseUser?.ops?.includes(opName))
        return children;
    else if (!opName) return children;
    else return fallback;
}
