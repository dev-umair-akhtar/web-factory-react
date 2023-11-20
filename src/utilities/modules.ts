import {
    AdminPanelSettings,
    AdminPanelSettingsOutlined,
    Dashboard,
    DashboardOutlined,
    People,
    PeopleAltOutlined,
    Settings,
    SettingsOutlined,
    SupervisedUserCircle,
    SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import { Modules } from "../types";

export const modules: Modules = {
    superadmin: [
        {
            id: 1,
            name: "Dashboard",
            url: "/mis",
            icon: { filled: Dashboard, outlined: DashboardOutlined },
            permissions: [
                "CREATE DASHBOARD",
                "READ DASHBOARD",
                "UPDATE DASHBOARD",
                "DELETE DASHBOARD",
            ],
        },

        {
            id: 2,
            name: "Superadmin",
            url: "/mis/superadmin",
            permissions: [
                "CREATE SUPERADMIN",
                "READ SUPERADMIN",
                "UPDATE SUPERADMIN",
                "DELETE SUPERADMIN",
            ],
            icon: {
                filled: SupervisedUserCircle,
                outlined: SupervisedUserCircleOutlined,
            },
        },

        {
            id: 3,
            name: "Role system",
            url: "/mis/role",
            permissions: [
                "CREATE ROLE",
                "UPDATE ROLE",
                "READ ROLE",
                "DELETE ROLE",
            ],
            icon: {
                filled: AdminPanelSettings,
                outlined: AdminPanelSettingsOutlined,
            },
        },

        {
            id: 4,
            name: "Clients",
            url: "/mis/client",
            permissions: [
                "CREATE CLIENT",
                "UPDATE CLIENT",
                "READ CLIENT",
                "DELETE CLIENT",
            ],
            icon: { filled: People, outlined: PeopleAltOutlined },
        },
    ],

    admin: [
        {
            id: 2,
            name: "Role System",
            url: "/role",
            permissions: [
                "CREATE ROLE",
                "UPDATE ROLE",
                "READ ROLE",
                "DELETE ROLE",
            ],
            icon: {
                filled: AdminPanelSettings,
                outlined: AdminPanelSettingsOutlined,
            },
        },

        {
            id: 4,
            name: "Users",
            url: "/user",
            permissions: [
                "CREATE ADMIN",
                "UPDATE ADMIN",
                "READ ADMIN",
                "DELETE ADMIN",
            ],
            icon: { filled: People, outlined: PeopleAltOutlined },
        },

        {
            id: 3,
            name: "Campus",
            url: "/campuses",
            permissions: [
                "CREATE CAMPUS",
                "UPDATE CAMPUS",
                "READ CAMPUS",
                "DELETE CAMPUS",
            ],
            icon: { filled: People, outlined: PeopleAltOutlined },
        },

        {
            id: 5,
            name: "Academics",
            icon: { filled: People, outlined: PeopleAltOutlined },
            subModules: [
                {
                    id: 5.1,
                    name: "Session ",
                    url: "/session",
                    permissions: [
                        "CREATE SESSION",
                        "UPDATE SESSION",
                        "READ SESSION",
                        "DELETE SESSION",
                    ],
                },

                {
                    id: 5.2,
                    name: "Classroom",
                    url: "/classroom",
                    permissions: [
                        "CREATE CLASSROOM",
                        "UPDATE CLASSROOM",
                        "READ CLASSROOM",
                        "DELETE CLASSROOM",
                    ],
                },

                {
                    id: 5.3,
                    name: "Section",
                    url: "/section",
                    permissions: [
                        "CREATE SECTION",
                        "UPDATE SECTION",
                        "READ SECTION",
                        "DELETE SECTION",
                    ],
                },

                {
                    id: 5.4,
                    name: "Publisher",
                    url: "/publisher",
                    permissions: [
                        "CREATE PUBLISHER",
                        "UPDATE PUBLISHER",
                        "READ PUBLISHER",
                        "DELETE PUBLISHER",
                    ],
                },

                {
                    id: 5.5,
                    name: "Subject",
                    url: "/subject",
                    permissions: [
                        "CREATE SUBJECT",
                        "UPDATE SUBJECT",
                        "READ SUBJECT",
                        "DELETE SUBJECT",
                    ],
                },
            ],
        },

        {
            id: 6,
            name: "Student",
            icon: { filled: People, outlined: PeopleAltOutlined },
            subModules: [
                {
                    id: 6.1,
                    name: "Addmission & View",
                    url: "/student",
                    permissions: [
                        "CREATE STUDENT",
                        "READ STUDENT",
                        "UPDATE STUDENT",
                        "DELETE STUDENT",
                    ],
                },

                {
                    id: 6.2,
                    name: "Promote",
                    url: "/student/promote-section",
                    permissions: ["PROMOTE STUDENT"],
                },

                {
                    id: 6.3,
                    name: "Categories",
                    url: "/student-category",
                    permissions: [
                        "CREATE STUDENT_CATEGORY",
                        "READ STUDENT_CATEGORY",
                        "UPDATE STUDENT_CATEGORY",
                        "DELETE STUDENT_CATEGORY",
                    ],
                },

                {
                    id: 6.4,
                    name: "Count Report",
                    url: "/student/count-report",
                    permissions: ["READ COUNT_REPORT"],
                },

                {
                    id: 6.5,
                    name: "Import From Excel",
                    url: "/import-from-excel",
                    permissions: ["IMPORT STUDENT"],
                },

                {
                    id: 6.6,
                    name: "Withdrawl Register",
                    url: "/student/withdrawl-register",
                    permissions: ["READ WITHDRAWL_REGISTER"],
                },
            ],
        },

        {
            id: 8,
            name: "Fees",
            icon: { filled: People, outlined: PeopleAltOutlined },
            subModules: [
                {
                    id: 8.1,
                    name: "Fee Category",
                    url: "/fee-category",
                    permissions: [
                        "CREATE FEE_CATEGORY",
                        "READ FEE_CATEGORY",
                        "UPDATE FEE_CATEGORY",
                        "DELETE FEE_CATEGORY",
                    ],
                },

                {
                    id: 8.2,
                    name: "Fee Structure",
                    url: "/fee-structure",
                    permissions: [
                        "CREATE FEE_STRUCTURE",
                        "READ FEE_STRUCTURE",
                        "UPDATE FEE_STRUCTURE",
                        "DELETE FEE_STRUCTURE",
                    ],
                },

                {
                    id: 8.3,
                    name: "Fee Discount",
                    url: "/fee-discount",
                    permissions: [
                        "CREATE FEE_DISCOUNT",
                        "READ FEE_DISCOUNT",
                        "UPDATE FEE_DISCOUNT",
                        "DELETE FEE_DISCOUNT",
                    ],
                },

                {
                    id: 8.4,
                    name: "Apply Fees",
                    url: "/apply-fees",
                    permissions: ["APPLY FEE"],
                },

                {
                    id: 8.5,
                    name: "Edit Fees",
                    url: "/edit-fees",
                    permissions: ["UPDATE FEE"],
                },

                {
                    id: 8.6,
                    name: "Collect Fees",
                    url: "/collect-fees",
                    permissions: ["COLLECT FEE"],
                },

                {
                    id: 8.7,
                    name: "Receipts",
                    url: "/fees/receipt/multiple",
                    permissions: ["GENERATE RECEIPT"],
                },

                {
                    id: 8.8,
                    name: "Fee Report",
                    url: "/fees/reports/fee-generated",
                    permissions: ["FEE REPORT"],
                },

                {
                    id: 8.9,
                    name: "Defaulters",
                    url: "/fees/reports/defaulters",
                    permissions: ["FEE DEFAULTER_REPORT"],
                },

                {
                    id: 8.1,
                    name: "View Collection",
                    url: "/fees/reports/daily-collection",
                    permissions: ["READ FEE_COLLECTION"],
                },
            ],
        },

        {
            id: 9,
            name: "Finance",
            url: "/banks",
            icon: { filled: People, outlined: PeopleAltOutlined },
            permissions: [
                "CREATE BANK",
                "UPDATE BANK",
                "READ BANK",
                "DELETE BANK",
            ],
        },

        {
            id: 10,
            name: "Family",
            icon: { filled: People, outlined: PeopleAltOutlined },
            subModules: [
                {
                    id: 10.1,
                    name: "Create",
                    url: "/family/create",
                    permissions: ["CREATE FAMILY"],
                },

                {
                    id: 10.2,
                    name: "Actions & Details",
                    url: "/family",
                    permissions: [
                        "READ FAMILY",
                        "UPDATE FAMILY",
                        "DELETE FAMILY",
                        "ADD MEMBER",
                        "REMOVE MEMBER",
                        "READ FAMILY_RECEIPT",
                    ],
                },
            ],
        },

        {
            id: 11,
            name: "Library",
            icon: { filled: People, outlined: PeopleAltOutlined },
            subModules: [
                {
                    id: 11.1,
                    name: "Authors",
                    url: "/library/authors",
                    permissions: [
                        "CREATE AUTHOR",
                        "READ AUTHOR",
                        "UPDATE AUTHOR",
                        "DELETE AUTHOR",
                    ],
                },

                {
                    id: 11.2,
                    name: "Publishers",
                    url: "/publisher",
                    permissions: [
                        "CREATE PUBLISHER",
                        "READ PUBLISHER",
                        "UPDATE PUBLISHER",
                        "DELETE PUBLISHER",
                    ],
                },

                {
                    id: 11.3,
                    name: "Genres",
                    url: "/library/genres",
                    permissions: [
                        "CREATE GENRES",
                        "READ GENRES",
                        "UPDATE GENRES",
                        "DELETE GENRES",
                    ],
                },

                {
                    id: 11.4,
                    name: "Books",
                    url: "/library/books",
                    permissions: [
                        "CREATE BOOK",
                        "READ BOOK",
                        "UPDATE BOOK",
                        "DELETE BOOK",
                    ],
                },

                {
                    id: 11.5,
                    name: "Stock",
                    url: "/library/stock",
                    permissions: [
                        "CREATE BOOK_INSTANCE",
                        "READ BOOK_INSTANCE",
                        "UPDATE BOOK_INSTANCE",
                        "DELETE BOOK_INSTANCE",
                    ],
                },

                {
                    id: 11.6,
                    name: "Issue / Return",
                    url: "/library/issue-return",
                    permissions: [
                        "CREATE LIBRARY_HISTORY",
                        "UPDATE LIBRARY_HISTORY",
                        "DELETE LIBRARY_HISTORY",
                        "READ LIBRARY_HISTORY",
                    ],
                },

                {
                    id: 11.7,
                    name: "History",
                    url: "/library/history",
                    permissions: [
                        "CREATE LIBRARY_HISTORY",
                        "READ LIBRARY_HISTORY",
                    ],
                },
            ],
        },

        {
            id: 12,
            name: "Certificates",
            url: "/certificates",
            permissions: [
                "CREATE CERTIFICATE",
                "READ CERTIFICATE",
                "UPDATE CERTIFICATE",
                "DELETE CERTIFICATE",
            ],
        },

        {
            id: 13,
            name: "Logs",
            url: "/logs",
            permissions: ["READ LOGS"],
        },

        {
            id: 14,
            name: "Settings",
            url: "/setting",
            icon: { filled: Settings, outlined: SettingsOutlined },
        },
    ],
};
