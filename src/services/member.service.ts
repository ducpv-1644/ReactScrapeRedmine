import http from "../common/http-common";
import AuthService from "./auth.service"
import { ListMembersType } from '../types/project.type';

type getAllMembersType = {
    code: number,
    message: string,
    result: Array<ListMembersType>
}

class MemberService {
    async getAllMembers(): Promise<getAllMembersType> {
        const { data } = await http.get("/members", { headers: AuthService.authHeader() });
        return data;
    }
    async GetIssueByMember(idMember: any) {
        const { data } = await http.get(`member/${idMember}`, { headers: AuthService.authHeader() });
        return data;
    }
}

export default new MemberService();
