import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import UserData from "../../types/user.type"
import { Form, Button, Alert, Container } from 'react-bootstrap';

import AuthService from "../../services/auth.service";
import NavbarComponent from '../layout/layout.component'

type State = {
    userData: UserData;
    loading: boolean,
    message: string;
}
export default class SignUp extends Component<RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);

        this.state = {
            userData: {
                id: null,
                username: "",
                password: "",
                email: "",
                passwordConfirm: ""
            },
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
        const email = e.target.value;
        this.setState((prevState) => ({
            userData: {
                ...prevState.userData,
                email: email,
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

    onChangePasswordConfirm(e: any) {
        const passwordConfirm = e.target.value;
        this.setState((prevState) => ({
            userData: {
                ...prevState.userData,
                passwordConfirm: passwordConfirm,
            },
        }));
    }

    async handleSignUp(e: any) {
        e.preventDefault();

        const { userData } = this.state;
        if (userData.passwordConfirm !== userData.password) {
            this.setState({
                message: "Password not match!",
                loading: true
            });
            return
        }
        const response = await AuthService.signup(userData)
        if (response.code !== 200) {
            this.setState({
                message: response.message,
                loading: true
            });
        } else {
            this.props.history.push("/signin")
            window.location.reload();
        }
    }

    render() {
        const { userData, loading, message } = this.state;
        return (
            <div>
                <NavbarComponent />
                <Form>
                    <Container>
                        <h1>Sign Up</h1>
                        <Alert show={loading} variant="danger">
                            <span>{message}</span>
                        </Alert>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                onChange={this.onChangeEmail}
                                value={userData.email} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} value={userData.password} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.onChangePasswordConfirm} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSignUp}>
                            Sign Up
                        </Button>
                    </Container>
                </Form>
            </div>
        );
    }
}
