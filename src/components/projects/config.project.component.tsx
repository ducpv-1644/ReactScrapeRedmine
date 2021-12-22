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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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


    componentDidMount() {
        this.retrieveProjects();
    }

    async retrieveProjects() {
        const idProject = this.props.match.params.id
        const res = await ProjectService.GetConfig(idProject);
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
        console.log("projects", projects)

        let ThListProjectDatatable = [
            {
                name: 'ID',
                selector: (row: any) => row.ID,
            },
            {
                name: 'Service',
                selector: (row: any) => row.service,
            },
            {
                name: 'Channel ID',
                selector: (row: any) => row.channel_id,
            },
            {
                name: 'Member ID',
                selector: (row: any) => row.member_id,
            },
            {
                name: 'Project ID',
                selector: (row: any) => row.project_id,
            },
            {
                cell: (row: any) => <Popup trigger={<button> Trigger</button>}position="right center">
                    <form>
                        <label>
                            Service:
                            <input type="text" value={projects.service} />
                        </label>
                        <label>
                            Channel ID:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Member ID:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Project ID:
                            <input type="text" name="name" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </Popup>
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
