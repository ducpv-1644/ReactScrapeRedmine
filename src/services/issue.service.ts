import http from "../common/http-common";
import AuthService from "./auth.service"
// import { IssuesDetailParamsType } from 'types/issues.type';


class IssuesService {
        async getAllIssues(idMember:any) {
            const {data} = await http.get(`issue?id=${idMember}`, {headers: AuthService.authHeader()});
            return data;
        }
}
export default new  IssuesService()