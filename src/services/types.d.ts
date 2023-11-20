type ApiResponse = any[];

type Role = {
    id: number;
    name: string;
};
//
type UserType = "superadmin" | "admin" | "faculty" | "student";
type User = {
    id: number;
    baseUser: {
        id: number;
        name: string;
        ops: string[];
        username: string;
        password: string;
        userId: number;
        role: Role;
        allRegionAccess: boolean;
        type: UserType;
        userRegions: unknown[];
    };
};
type UserFilter = { search?: string };
//
type LoginResponse = {
    res: { message: string; user: User } | null;
    err: string | null;
};
type UserCredentials = { username: string; password: string; client: string };
//
type IsLoggedResponse = {
    res: { logged: boolean; message: string; user: User } | null;
    err: string | null;
};

interface IUserService {
    loginUser: (credentials: UserCredentials) => Promise<LoginResponse>;
    logoutUser: () => Promise<ApiResponse>;
    isLoggedIn: () => Promise<IsLoggedResponse>;
    // createUser;
    getUsers: (
        page: number,
        limit: number,
        filter?: UserFilter
    ) => Promise<ApiResponse>;
    // deleteUserSoft;
    // deleteUserHard;
    // editUser;
    // getUserTypes;
    // getClient;
    // getUserImages;
}

//
type SuperadminFilter = { search?: string };
// --
interface ISuperadminService {
    getSuperadmins: (
        page: number,
        limit: number,
        filter: SuperadminFilter
    ) => Promise<ApiResponse>;
    // createSuperadmin: () => Promise<ApiResponse>;
    // softDelete: () => Promise<ApiResponse>;
    // hardDelete: () => Promise<ApiResponse>;
}

//

type ClientStatus = "active" | "inactive" | "terminated";
type ClientPackageType = "starter" | "professional" | "enterprise";
type ClientType = "namelist" | "trial" | "installed" | "visiting" | "followup";

type Client = {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    mobile: string;
    email: string;
    app_username: string;
    app_password: string;
    expiry: string;
    visitingTime: string;
    followupTime: string;
    installationTime: string;
    type: ClientType;
    packageType: ClientPackageType;
    status: ClientStatus;
    theme: string;
};
type ClientFilter = {
    search?: string;
    status?: ClientStatus;
    packageType?: ClientPackageType;
    type?: ClientType;
};

type GetClientsResponse = {
    res: null | { count: number; message: string; rows: Client[] };
    err: string | null;
};

interface IClientService {
    createClient: (newClient: NewClient) => Promise<>;
    getClients: (
        page: number,
        limit: number,
        filter: ClientFilter = {}
    ) => Promise<any[]>;
}

//

type APIResponseError = { response: { data: { message: string } } };

// {
//     "id": 1,
//     "createdAt": "2023-02-12T14:48:23.826Z",
//     "updatedAt": "2023-10-04T04:45:40.000Z",
//     "deleted": null,
//     "name": "The City School",
//     "description": "Established in Karachi in 1978, The City School is today one of the largest private school networks across the globe.\nHaving more than 500 schools with over 150,000 students, we continue to expand our reach in other countries including United Arab Emirates, Malaysia, Philippines, Oman and Saudi Arabia, to meet the demands for quality education as well as to ensure a strong global presence.\n\nThe knowledge and skills-based curriculum derived from the UK national curriculum guides students from Nursery to Cambridge International Examinations (CAIE), qualifying them for the IGCSE, and O and A Level examinations.",
//     "address": "31-Industrial Area, Gurumangat Road, Gulberg III, Lahore, Pakistan.",
//     "phone": "+92 (42) 111-444-123",
//     "mobile": "+92 (42) 111-444-123",
//     "email": "thecityschool@gmail.com",
//     "app_username": "admin",
//     "app_password": "shahid",
//     "expiry": "2025-12-31T00:00:00.000Z",
//     "visitingTime": "2020-12-01T00:00:00.000Z",
//     "followupTime": "2021-12-15T00:00:00.000Z",
//     "installationTime": "2021-01-01T00:00:00.000Z",
//     "type": "installed",
//     "packageType": "starter",
//     "status": "active",
//     "theme": "{\"palette\":{\"primary\":{\"main\":\"#ff0000\"},\"secondary\":{\"main\":\"#f1efef\"},\"background\":{\"default\":\"#ffffff\",\"paper\":\"#3859ff\"}},\"typography\":{\"fontFamily\":\"Arial\"}}"
// }
