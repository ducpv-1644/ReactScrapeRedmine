import http from "../common/http-common";

class ProjectService {
    async getAllProjects() {
        const {data} = await http.get("/projects");
        return data;
    }
}

export default new ProjectService();
