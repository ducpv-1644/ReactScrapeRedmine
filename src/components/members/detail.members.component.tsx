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
import DataTable from "react-data-table-component";
import { IssueType, MenberType } from 'types/project.type';
import IssuesService from '../../services/issue.service'
import { ThListIssueDatatable } from "./constants"
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
    rowsDataIssues:Array<any>,
    message: string,
    errorRaised: boolean
};

export default class MemberDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveIssuesDetail = this.retrieveIssuesDetail.bind(this);
        this.state = {
            dates: {
                startDate: "",
                endDate: ""
            },
            rowsDataIssues: [],
            message: "",
            errorRaised: false
        };
    }

    componentDidMount() {
        this.retrieveIssuesDetail();
    }
  
    async retrieveIssuesDetail() {
        let idMember = this.props.match.params.id
        const res = await IssuesService.getAllIssues(idMember)
       
        if (res.code !== 200) {
            this.setState({
                rowsDataIssues: [],
                message: res.message,
                errorRaised: true
            });
            return
        }
        this.setState({
                
                rowsDataIssues: res.result,
                
        });
    }
    render() {
       
        const { dates, rowsDataIssues} = this.state
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
                    <DataTable
                        title="Issues Detail"
                        columns={ThListIssueDatatable}
                        data={rowsDataIssues}
                        pagination
                
                    />
                </Container>
            </div>
        )
    }
}
