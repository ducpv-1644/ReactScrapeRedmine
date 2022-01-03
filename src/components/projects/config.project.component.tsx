import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import AuthService from "../../services/auth.service"
import {Component, MouseEvent, MouseEventHandler} from "react";
import {RouteComponentProps} from 'react-router-dom';
import {Container, FloatingLabel, Form, Button, Modal} from 'react-bootstrap';
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
    service: any,
    channel_id: any,
    member_id: any,
    project_id: any,
};


function handle(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("e", e)
}

export default class ProjectVersion extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveProjects = this.retrieveProjects.bind(this);

        this.state = {
            projects: [],
            message: "",
            errorRaised: false,
            val: "",
            service: "",
            channel_id: "",
            member_id: "",
            project_id: "",
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

    handleChangeService = (e: any) => {
        this.setState({
            service: e.target.value
        })
    }
    handleChangeChannel = (e: any) => {
        this.setState({
            channel_id: e.target.value
        })
    }
    handleChangeMember = (e: any) => {
        this.setState({
            member_id: e.target.value
        })
    }
    handleChangeProject = (e: any) => {
        this.setState({
            project_id: e.target.value
        })
    }
    handleSubmitCreate = (e: any) => {
        e.preventDefault()
        const token = AuthService.authHeader().Authorization
        axios({
            method: 'post',
            url: `http://10.0.4.11:7000/config`,
            data: {
                project_id: this.state.project_id, channel_id: this.state.channel_id, service: this.state.service, member_id: this.state.member_id,
            },
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
        })
        window.location.reload()
    }
    handleSubmit = (e: any, id: any) => {
        e.preventDefault()
        const token = AuthService.authHeader().Authorization
        axios({
            method: 'post',
            url: `http://10.0.4.11:7000/config/${id}`,
            data: {
                id: id, project_id: this.state.project_id, channel_id: this.state.channel_id, service: this.state.service, member_id: this.state.member_id,
            },
            headers: {
                 'Authorization': `${token}`,
                'Content-type': 'application/json'
            }
        })
        window.location.reload()
    }
    async handleButtonClickDelete  (id: any)  {
        console.log("Em vao day roi")
        return await ProjectService.DeleteConfig(id)
    };
    render() {
        const {projects} = this.state
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
                cell: (row: any) => <Popup trigger={<button>Set Channel</button>} position="right center">
                    <form>
                        <label>
                            Service:
                            <input onChange={(e) => this.handleChangeService(e)} value={this.state.service} type="text"
                                   name="service"/>
                        </label>
                        <label>
                            Channel ID:
                            <input onChange={(e) => this.handleChangeChannel(e)} value={this.state.channel_id}
                                   type="text" name="channel_id"/>
                        </label>
                        <label>
                            Member ID:
                            <input onChange={(e) => this.handleChangeMember(e)} value={this.state.member_id} type="text"
                                   name="member_id"/>
                        </label>
                        <label>
                            Project ID:
                            <input onChange={(e) => this.handleChangeProject(e)} value={this.state.project_id}
                                   type="text" name="project_id"/>
                        </label>
                        <button onClick={(e) => this.handleSubmit(e, row.ID)} id={row.ID} type="button"
                                value="Submit"> Update
                        </button>
                    </form>
                </Popup>
            },
            {
                cell: (row: any) => <button onClick={() => this.handleButtonClickDelete(row.ID)}
                                            id={row.ID}>Delete</button>,

                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ];
        return (
            <div>
                <NavbarComponent/>
                <Container>
                   <div><h3>Thêm Kênh và người nhận noti</h3></div>
                    <Form  >
                        <Container>
                           <div>
                               <label>
                                   Service:
                                   <input onChange={(e) => this.handleChangeService(e)} value={this.state.service} type="text"
                                          name="service"/>
                               </label>
                               <label>
                                   Channel ID:
                                   <input onChange={(e) => this.handleChangeChannel(e)} value={this.state.channel_id}
                                          type="text" name="channel_id"/>
                               </label>
                               <label>
                                   Member ID:
                                   <input onChange={(e) => this.handleChangeMember(e)} value={this.state.member_id} type="text"
                                          name="member_id"/>
                               </label>
                               <label>
                                   Project ID:
                                   <input onChange={(e) => this.handleChangeProject(e)} value={this.state.project_id}
                                          type="text" name="project_id"/>
                               </label>
                               <button onClick={(e) => this.handleSubmitCreate(e)} type="button"
                                       value="Submit"> Create
                               </button>
                           </div>
                        </Container>
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
