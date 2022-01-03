import http from "../common/http-common";
import AuthService from "./auth.service"
import { ProjectDetailParamsType } from 'types/project.type';
import axios from "axios";

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
        const idProjects = JSON.parse(idProject)
        const versions = JSON.parse(version)
        console.log(`crawl_issues?project_id=${idProjects}&version=${versions}`)
        console.log(" AuthService.authHeader()", AuthService.authHeader())
        return  await http.get(`crawl_issues?project_id=${idProjects}&version=${versions}`, {headers: AuthService.authHeader()});
    }
    async GetConfig(idProject: any){
        const {data} =  await http.get(`config?project_id=${idProject}`, {headers: AuthService.authHeader()});
        return data;
    }
    async DeleteConfig(id:any){
        return await http.delete(`config/${id}`,{headers: AuthService.authHeader()  })
    }
}

export default new ProjectService();
