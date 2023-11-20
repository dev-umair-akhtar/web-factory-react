import { baseAPI } from "../utilities/constants";
import { GET } from "./GET";

export class SuperadminService implements ISuperadminService {
    static url = `${baseAPI}/superadmin`;
    static instance: SuperadminService;

    static getInstance() {
        if (SuperadminService.instance) return SuperadminService.instance;
        else {
            SuperadminService.instance = new SuperadminService();
            return SuperadminService.instance;
        }
    }
    getSuperadmins = async (
        page: number,
        limit: number,
        filter?: SuperadminFilter
    ) => GET(`${SuperadminService.url}`, { page, limit, ...filter });
}
