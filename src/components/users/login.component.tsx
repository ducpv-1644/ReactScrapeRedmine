import React, { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import UserLoginData from "../../types/user.type"
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const required = (value: string|undefined|null) => {
    if (!value) {
        return (
            <div className= "alert alert-danger" role = "alert" >
                This field is required!
            </div>
        );
    }
};

interface RouterProps {}

type State = {
    userData: UserLoginData;
    loading: boolean,
    message: string;
}

export default class Login extends Component<RouterProps, State> {
    constructor(props: any) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            userData: {
                id: null,
                username: "",
                password: "",
                email: ""
            },
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
        const username = e.target.value;
        this.setState((prevState) => ({
            userData: {
                ...prevState.userData,
                username: username,
            },
        }));
    }

    onChangePassword(e: any) {
        const password = e.target.value;
        this.setState((prevState) => ({
            userData: {
                ...prevState.userData,
                password: password,
            },
        }));
    }

    async handleLogin(e: any) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });
        const { userData } = this.state;

        console.log('username', userData.username)
        console.log('pw', userData.password)

        const response = await AuthService.login(userData)
        console.log(response)

        // this.props.history.push("/");
        // window.location.reload();

        this.setState({
            loading: false
        });
    }

    render() {
        const { userData, loading } = this.state;
        return (
            <div className= "col-md-12" >
                <div className="card card-container" >
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt = "profile-img"
                        className = "profile-img-card"
                    />
                    <form method="post" onSubmit={this.handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username"> Username </label>
                            <input type="text" className="form-control"
                                name="username"
                                value={ userData.username }
                                onChange={ this.onChangeUsername }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> Password </label>
                            <input type="password" className="form-control"
                                name="password"
                                value={ userData.password }
                                onChange={ this.onChangePassword }
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={loading}
                                onClick={this.handleLogin}
                            >
                                <span>Login</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
