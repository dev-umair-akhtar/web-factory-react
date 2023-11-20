import { baseAPI } from "../utilities/constants";
import { GET } from "./GET";
import { POST } from "./POST";

export class ClientService implements IClientService {
    static url = `${baseAPI}/superadmin/client`;
    static instance: ClientService;

    static getInstance() {
        if (ClientService.instance) {
            return ClientService.instance;
        } else {
            ClientService.instance = new ClientService();

            return ClientService.instance;
        }
    }

    createClient = async (newClient: Client) =>
        POST(ClientService.url + "", newClient);

    getClients = async (page = 1, limit = 10, filter: ClientFilter = {}) =>
        await GET(ClientService.url + "", {
            page,
            limit,
            ...filter,
        });
}
