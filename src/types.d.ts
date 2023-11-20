import { SvgIconComponent } from "@mui/icons-material";
import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Feedback = {
    loading: boolean;
    show: boolean;
    message: string;
    severity?: AlertColor;
};

type Module = {
    id: number;
    name: string;
    url?: string;
    permissions?: string[];
    subModules?: Module[];
    icon?: { filled: SvgIconComponent; outlined: SvgIconComponent };
};
type Modules = {
    superadmin: Module[];
    admin: Module[];
};
type ThemeMode = "dark" | "light";

type AppCtx = {
    feedback: Feedback;
    setFeedback: Dispatch<SetStateAction<Feedback>>;

    pageTitle: string;
    setPageTitle: Dispatch<SetStateAction<string>>;

    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;

    userType: UserType | null;
    setUserType: Dispatch<SetStateAction<UserType | null>>;

    theme: ThemeMode;
    setTheme: Dispatch<SetStateAction<ThemeMode>>;
};

type TableOps = {
    read: string;
    edit?: string;
    delete?: string;
};
type TableProps = {
    getter: (...args: any) => Promise<any[]>;
    editor?: (...args: any) => Promise<any[]>;
    deletor?: (ids: (string | number)[]) => Promise<any[]>;
    rowsPreprocessor?: (row: any) => any;
    ops: TableOps;
    opsMessages?: {
        read?: string;
        edit?: string;
        delete?: string;
    };
    readables: { [key: string]: string };
    editables?: {
        name: string;
        type: "textfield" | "select" | "autocomplete";
        fieldProps?: any;
        label: string;
        permission?: string;
        options?: {
            value: any;
            label: string;
            valuesFetcher: (rowToEdit: object) => Promise<any[]>;
        };

        autocomplete?: {
            api?: string;
            labelKey: string;
            apiParams?: any;
            defaultValue?: any;
            label: string;
            defaultOptions?: any;
            preprocessor?: (row: any) => any;
        };
    }[];
    updatingAgents?: any[];
    parseTags?: boolean;
    deleteForever?: any;
    customCols?: { header: string; content: (row: any) => any }[];
    filters?: ReactElement;
    defaultSelected?: string[];
    actions?: ReactElement<HTMLButtonElement>[];
    hasSearchbar?: boolean;
};
