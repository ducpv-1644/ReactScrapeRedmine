export default function authHeader() {
    const temp = localStorage.getItem('user');
    const user = temp ? JSON.parse(temp) : {};

    // const user = JSON.parse(window.localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}
