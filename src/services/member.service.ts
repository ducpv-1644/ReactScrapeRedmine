import http from "../common/http-common";
import AuthService from "./auth.service"
import { ListMembersType } from '../types/project.type';

type getAllMembersType = {
    code: number,
    message: string,
    result: Array<ListMembersType>
}

class MemberService {
    async getAllMembers():Promise<getAllMembersType> {
        const {data} = await http.get("/members", {headers: AuthService.authHeader()});
        return data;
    }

    // async getAllProjectDetail(params: ProjectDetailParamsType) {
    //     const {data} = await http.get(`effort?project_id=${params.project_id}&filter=effort`, {headers: AuthService.authHeader()});
    //     return data;
    // }
}

export default new MemberService();
