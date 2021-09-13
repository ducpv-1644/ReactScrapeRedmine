export default function authHeader() {
    const temp = localStorage.getItem('user');
    const user = temp ? JSON.parse(temp) : {};

    if (user && user.token) {
        console.log(user.token)
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}
