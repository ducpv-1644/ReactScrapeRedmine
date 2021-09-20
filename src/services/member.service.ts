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
        //members?ranges=09/01/2021-09/06/2021
        const { data } = await http.get("/members?ranges=09/01/2021-09/06/2021", { headers: AuthService.authHeader() });
        return data;
    }
    //member/fake01?ranges=09/01/2021-09/06/2021
    async GetIssueByMember(idMember: any) {
        const { data } = await http.get(`member/${idMember}?ranges=09/01/2021-09/06/2021`, { headers: AuthService.authHeader() });
        return data;
    }
}

export default new MemberService();
