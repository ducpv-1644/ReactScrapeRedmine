import { Component } from "react";
import { Badge } from 'react-bootstrap';

import NavbarComponent from './layout/layout.component'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <NavbarComponent />
                <h1>
                    Home Page <Badge bg="secondary">S-crawl</Badge>
                </h1>
            </div>
        );
    }
}
