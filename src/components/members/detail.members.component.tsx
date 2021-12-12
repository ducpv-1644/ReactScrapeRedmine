import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Component } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { FloatingLabel, Form, Container } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import DataTable from "react-data-table-component";
import MemberService from '../../services/member.service'
import { ThListIssueDatatable } from "./constants"
import NavbarComponent from 'components/layout/layout.component'

interface RouterProps {
    id: string;
}

type Props = RouteComponentProps<RouterProps>;

type RangeDate = {
    startDate: any,
    endDate: any
};

type State = {
    dates: RangeDate,
    rowsDataIssues: Array<any>,
    message: string,
    errorRaised: boolean,
    spentTime: string,
    estTime: string,
    spentTimeProject: string,
    estTimeProject: string
};

export default class MemberDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveIssuesDetail = this.retrieveIssuesDetail.bind(this);
        this.handleApply = this.handleApply.bind(this)
        var today = new Date(),
            date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        if ((today.getMonth() + 1) <= 9) {
            var getMonth = '0' + (today.getMonth() + 1)
            date = getMonth + '/' + today.getDate() + '/' + today.getFullYear();
        }
        if (today.getDate() <= 9) {
            var geDate = '0' + today.getDate()
            date = (today.getMonth() + 1) + '/' + geDate + '/' + today.getFullYear();
        }
        if (((today.getMonth() + 1) <= 9) && (today.getDate() <= 9)) {
            var getMonth = '0' + (today.getMonth() + 1)
            var geDate = '0' + today.getDate()
            date = getMonth + '/' + geDate + '/' + today.getFullYear();
        }
        this.state = {
            dates: {
                startDate: date,
                endDate: date,
            },
            spentTime: "",
            estTime: "",
            spentTimeProject: "",
            estTimeProject: "",

            rowsDataIssues: [],
            message: "",
            errorRaised: false
        };

    }

    componentDidMount() {
        this.retrieveIssuesDetail();
    }
    handleApply(event: any, picker: any) {
        this.setState({
            dates: {
                startDate: picker.startDate.format("MM/DD/YYYY"),
                endDate: picker.endDate.format("MM/DD/YYYY")
            }
        })
        this.retrieveIssuesDetail();
    }
    async retrieveIssuesDetail() {
        const idMember = this.props.match.params.id
        const res = await MemberService.GetIssueByMember(idMember, this.state.dates.startDate, this.state.dates.endDate)

        if (res.code !== 200) {
            this.setState({
                rowsDataIssues: [],
                spentTime: res.result.sum_spent_time,
                estTime: res.result.sum_est_time,
                spentTimeProject : res.result.sum_spent_project_time,
                estTimeProject : res.result.sum_est_project_time,
                message: res.message,
                errorRaised: true
            });
            return
        }
        this.setState({
            rowsDataIssues: res.result.IssueResult !== null ? res.result.IssueResult : [],
            spentTime: res.result.sum_spent_time,
            estTime: res.result.sum_est_time,
             spentTimeProject : res.result.sum_spent_project_time,
            estTimeProject : res.result.sum_est_project_time,
        });
    }
    render() {
       
        const { dates, rowsDataIssues, spentTime, estTime ,spentTimeProject ,estTimeProject} = this.state
        console.log("spentTimeProject",spentTimeProject)
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
                            onApply={this.handleApply}                        >
                            <input
                                type="text"
                                // value={dates.startDate + "-" + dates.endDate}
                                className="form-control"
                            />
                        </DateRangePicker>
                    </FloatingLabel>
                </Container>
                <Container>
                    <p></p>
                    <p> <b>Total Est Time : </b>{estTime}h</p>
                    <p> <b>Total Spent Time: </b>{spentTime}h</p>
                    <p> <b>Total Est Project: </b>{estTimeProject.substring(1, estTimeProject.length-1)}h</p>
                    <p> <b>Total Spent Project: </b>{spentTimeProject.substring(1, spentTimeProject.length-1)}h</p>
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
