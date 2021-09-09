import http from "../common/http-common";
import UserData from "../types/user.type"

class AuthService {
    async signin(userData: UserData) {
        const {data} = await http.post("/signin", userData);
        if (data.code === 200) {
            if (data.result.token !== undefined) {
                localStorage.setItem("user", JSON.stringify(data.result));
            }
        }
        return data;
    }

    async signup(userData: UserData) {
        const {data} = await http.post("/signup", userData);
        return data;
    }

    getCurrentUser() {
        const temp = localStorage.getItem('user');
        return temp ? JSON.parse(temp) : null
    }

    isLogged() {
        return this.getCurrentUser() ? true : false
    }
}

export default new AuthService();
