import http from "../http-common";
import UserLoginData from "../types/user.type"

class AuthService {
    async login(data: UserLoginData) {
        const response = await http.post("/signin", data);
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    async logout() {
        localStorage.removeItem("user");
    }

    async register(data: UserLoginData) {
        const response = await http.post("/signup", data);
        return response.data;
    }

    // getCurrentUser() {
    //     return JSON.parse(localStorage.getItem('user'));
    // }
}

export default new AuthService();
