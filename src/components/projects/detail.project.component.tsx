import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Component } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { FloatingLabel, Form, Container } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { MDBDataTableV5 } from 'mdbreact';

import { IssueType, MenberType } from 'types/project.type';
import ProjectService from '../../services/project.service'
import { ThListIssuesDatatable, ThListMemberDatatable } from "./constants"
import NavbarComponent from 'components/layout/layout.component'

interface RouterProps {
    id: string;
}

type Props = RouteComponentProps<RouterProps>;

type RangeDate = {
    startDate: string,
    endDate: string
};

type State = {
    dates: RangeDate,
    issuesDatatable: Array<IssueType>,
    membersDatatable: Array<MenberType>,
    members: any
    message: string,
    errorRaised: boolean
};

export default class ProjectDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveProjectDetail = this.retrieveProjectDetail.bind(this);

        this.state = {
            dates: {
                startDate: "",
                endDate: ""
            },
            issuesDatatable: [],
            membersDatatable: [],
            message: "",
            members: [],
            errorRaised: false
        };
    }

    componentDidMount() {
        this.retrieveProjectDetail();
    }

    async retrieveProjectDetail() {
        const projectDetailParams = {
            project_id: this.props.match.params.id
        }
        const res = await ProjectService.getAllProjectDetail(projectDetailParams)
        if (res.code !== 200) {
            this.setState({
                issuesDatatable: [],
                message: res.message,
                errorRaised: true
            });
            return
        }
        this.setState({
            issuesDatatable: res.result.issues,
            membersDatatable: res.result.members
        });
    }

    render() {
        const { dates, issuesDatatable, membersDatatable } = this.state
        const datatable = {
            columns: ThListIssuesDatatable,
            rows: issuesDatatable,
        };
        const menberDatatable = {
            columns: ThListMemberDatatable,
            rows: membersDatatable,
        };
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
                            initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2014' }}
                        >
                            <input
                                type="text"
                                value={dates.startDate + "-" + dates.endDate}
                                className="form-control"
                            />
                        </DateRangePicker>
                    </FloatingLabel>
                </Container>
                <Container>
                    <h2>List Issues</h2>
                    <MDBDataTableV5 hover
                        entriesOptions={[5, 20, 25]}
                        entries={5}
                        pagesAmount={4}
                        data={datatable}
                        searchTop
                        searchBottom={false}
                    />
                </Container>
                <Container>
                    <h2>List Assignee</h2>
                    <MDBDataTableV5 hover
                        entriesOptions={[5, 20, 25]}
                        entries={5}
                        pagesAmount={4}
                        data={menberDatatable}
                        searchTop
                        searchBottom={false}
                    />
                </Container>
            </div>
        )
    }
}
