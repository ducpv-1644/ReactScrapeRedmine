import http from "../common/http-common";
import AuthService from "./auth.service"
import { ProjectDetailParamsType } from 'types/project.type';

class ProjectService {
    async getAllProjects() {
        const {data} = await http.get("/projects", {headers: AuthService.authHeader()});
        return data;
    }

    async getAllProjectDetail(params: ProjectDetailParamsType) {
        const {data} = await http.get(`effort?project_id=${params.project_id}&filter=effort`, {headers: AuthService.authHeader()});
        return data;
    }
}

export default new ProjectService();
