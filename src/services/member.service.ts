import http from "../common/http-common";
import AuthService from "./auth.service"
import { ListMembersType } from '../types/project.type';

type getAllMembersType = {
    code: number,
    message: string,
    result: Array<ListMembersType>
}

class MemberService {
    async getAllMembers(startDate: any, endDate: any): Promise<getAllMembersType> {
        const { data } = await http.get(`/members?ranges=${startDate}-${endDate}`, { headers: AuthService.authHeader() });
        return data;
    }
    async GetIssueByMember(idMember: any,startDate: any, endDate: any) {
        const { data } = await http.get(`member/${idMember}?ranges=${startDate}-${endDate}`, { headers: AuthService.authHeader() });
        return data;
    }
}

export default new MemberService();
