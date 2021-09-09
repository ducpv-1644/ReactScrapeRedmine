import { Component } from "react";
import { RouteComponentProps } from 'react-router-dom';

import NavbarComponent from 'components/layout/layout.component'

interface RouterProps {
    id: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    issues: any,
    members: any
    message: string,
    errorRaised: boolean
};

export default class ProjectDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            issues: [],
            message: "",
            members: [],
            errorRaised: false
        };
    }

    render() {
        return (
            <NavbarComponent />
        )
    }
}
