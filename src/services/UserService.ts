import { baseAPI } from "../utilities/constants";
import { GET } from "./GET";
import { POST } from "./POST";

export class UserService implements IUserService {
    static url = `${baseAPI}/org/user`;
    static instance: UserService;

    static getInstance() {
        if (UserService.instance) {
            return UserService.instance;
        } else {
            UserService.instance = new UserService();
            return UserService.instance;
        }
    }

    loginUser = async (credentials: UserCredentials) => {
        const [res, err] = await POST(UserService.url + "/login", credentials);

        return { res, err } as LoginResponse;
    };

    isLoggedIn = async () => {
        const [res, err] = await GET(UserService.url + "/is-logged");

        return { res, err } as IsLoggedResponse;
    };

    logoutUser = async () => POST(UserService.url + "/logout");

    getUsers = async (page: number, limit: number, filter: UserFilter = {}) =>
        GET(UserService.url, { page, limit, ...filter });
}
