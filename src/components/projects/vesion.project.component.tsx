import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import AuthService from "../../services/auth.service"
import {Component, MouseEventHandler} from "react";
import {RouteComponentProps} from 'react-router-dom';
import {Container, FloatingLabel, Form, Button} from 'react-bootstrap';
import ProjectService from '../../services/project.service'
import DateRangePicker from "react-bootstrap-daterangepicker";
import DataTable from 'react-data-table-component';
import axios from 'axios'
import http from "../../common/http-common";

import NavbarComponent from "../layout/layout.component";

interface RouterProps {
    id: string;
}

type Props = RouteComponentProps<RouterProps>;


type State = {
    projects: any,
    message: string,
    errorRaised: boolean
    val: any,
};


export default class ProjectVersion extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveProjects = this.retrieveProjects.bind(this);

        this.state = {
            projects: [],
            message: "",
            errorRaised: false,
            val: "",
        };
    }

    onSubmit = () => {
        const idProject = this.props.match.params.id
        window.location.reload();
        return ProjectService.CrawlIssueByVersion(idProject, this.state.val)

    };
    handleButtonClick = (id: any) => {
        const idProject = this.props.match.params.id
        const token = AuthService.authHeader().Authorization
        console.log("idProject", idProject)
        const idProjects = JSON.parse(idProject)
        axios({
            method: 'post',
            url: 'http://10.0.4.11:7000/version_project',
            data: {
                id: id, project_id: idProjects
            },
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
        })
        window.location.reload();
    };

    componentDidMount() {
        this.retrieveProjects();
    }

    async retrieveProjects() {
        const idProject = this.props.match.params.id
        const res = await ProjectService.GetAllVersionProject(idProject);
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
        const {projects} = this.state
        let ThListProjectDatatable = [
            {
                name: 'ID',
                selector: (row: any) => row.ID,
            },
            {
                name: 'Version',
                selector: (row: any) => row.version,
            },
            {
                name: 'Current version',
                selector: (row: any) => row.current == true ? "true" : "false",
            },
            {
                cell: (row: any) => <button onClick={() => this.handleButtonClick(row.ID)}
                                            id={row.ID}>Set Version</button>,

                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },

        ];

        return (
            <div>
                <NavbarComponent/>
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
                    <Form className="col-md-12">
                        <Form.Control
                            className="textFeedback"
                            as="textarea"
                            placeholder="version"
                            value={this.state.val}
                            onChange={e => this.setState({val: e.target.value})}
                            type="text"
                            style={{marginTop: "50px", width: "200px"}}
                        />
                        <Button
                            className="btnFormSend"
                            variant="outline-success"
                            onClick={this.onSubmit}
                        >
                            Crawl Version
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <DataTable
                        title="Project"
                        columns={ThListProjectDatatable}
                        striped={true}
                        fixedHeader={true}
                        selectableRows={true}
                        data={projects}
                        pagination
                        dense
                    />
                </Container>
            </div>
        )
    }
}
