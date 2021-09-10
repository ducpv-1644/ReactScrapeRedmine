import { Component } from "react";

import NavbarComponent from './layout/layout.component'
import ProjectList from './projects/project.component'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <NavbarComponent />
                <ProjectList />
            </div>
        );
    }
}
