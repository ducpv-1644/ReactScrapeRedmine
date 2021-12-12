import { Component } from "react";
import {Card, Container, Row, Col, FloatingLabel, Form} from 'react-bootstrap';
import ProjectService from '../../services/project.service'
import { ProjectType } from '../../types/project.type'
import DateRangePicker from "react-bootstrap-daterangepicker";
import DataTable from "react-data-table-component";
import {ThListIssueDatatable} from "../members/constants";
import {ThListProjectDatatable} from "./constants";
import NavbarComponent from "../layout/layout.component";

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
            <div>
                <NavbarComponent />
                <Container>
                    <FloatingLabel controlId="floatingSelect" label="Range type with selects">
                        <Form.Select aria-label="Floating label select example">
                            <option>All</option>
                            <option value="week">Week</option>
                            <option value="">Quarter</option>
                            <option value="3">effort</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingSelect" label="Range date with selects">
                        <DateRangePicker
                        >
                            <input
                                id="fname"
                                type="text"
                                className="form-control"

                            />
                        </DateRangePicker>
                    </FloatingLabel>
                </Container>
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
            </div>
        )
    }
}
