import { Component } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

class NavbarComponent extends Component {
    constructor(props: RouteComponentProps) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        localStorage.removeItem("user");
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand><Link to={"/home"} className="nav-link">S-crawl</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to={"/home"} className="nav-link">Home</Link>
                                <Link to={"/signup"} className="nav-link">Sign Up</Link>
                                <Link to={"/signin"} className="nav-link">Sign In</Link>
                                <Link to={"/home"} className="nav-link" onClick={this.signOut}>Sign out</Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default NavbarComponent;
