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
export default class SignIn extends Component<RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
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

    async handleSignIn(e: any) {
        e.preventDefault();

        const { userData } = this.state;
        const response = await AuthService.signin(userData)
        if (response.code !== 200) {
            this.setState({
                message: response.message,
                loading: true
            });
        } else {
            this.props.history.push("/")
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
                        <h1>Sign In</h1>
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
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSignIn}>
                            Sign In
                        </Button>
                    </Container>
                </Form>
            </div>
        );
    }
}
