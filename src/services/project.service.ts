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
    async GetAllVersionProject(idProject: any){
        const {data} = await http.get(`project_versions?project_id=${idProject}`, {headers: AuthService.authHeader()});
        return data;
    }
    async CrawlIssueByVersion(idProject: any, version:any){
       return  await http.get(`crawl_issues?project_id=${idProject}&version=${version}`, {headers: AuthService.authHeader()});
    }
}

export default new ProjectService();
