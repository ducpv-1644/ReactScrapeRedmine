import { Component } from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';
import ProjectService from '../../services/project.service'
import ProjectType from '../../types/project.type'

type Props = {};

type State = {
    projects: any,
    message: string,
    errorRaised: boolean
};

export default class ProjectList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveProjects = this.retrieveProjects.bind(this);

        this.state = {
            projects: [],
            message: "",
            errorRaised: false
        };
    }

    componentDidMount() {
        this.retrieveProjects();
    }

    async retrieveProjects() {
        const res = await ProjectService.getAllProjects()
        if (res.code !== 200) {
            this.setState({
                projects: [],
                message: res.message,
                errorRaised: true
            });
            return
        }
        this.setState({
            projects: res.result
        });
    }

    render() {
        const { projects } = this.state
        return (
            <Container>
                <h1>List Projects</h1>
                <Row xs={1} md={5} className="g-4">
                    {projects && projects.map((project: ProjectType, index: number) => (
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{project.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">coming soon...</Card.Subtitle>
                                    <Card.Text>comming soon...</Card.Text>
                                    <Card.Link href={'/project/' + project.ID}>Details</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}
