import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Component } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { FloatingLabel, Form, Container } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import DataTable from "react-data-table-component";

import { ThListMembersDatatable } from './constants';
import MemberService from '../../services/member.service'


type RangeDate = {
    startDate: any,
    endDate: any
};

type State = {
    dates: RangeDate,
    message: string,
    listMemberDataTable: Array<any>,
    errorRaised: boolean,
};

export default class ListMembers extends Component<RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.retrieveListMembers = this.retrieveListMembers.bind(this);
        this.handleRowClicked = this.handleRowClicked.bind(this);
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
                endDate: date
            },
            message: "",
            listMemberDataTable: [],
            errorRaised: false
        };
    }

    componentDidMount() {
        this.retrieveListMembers();
    }

    handleApply(event: any, picker: any) {
        this.setState({
            dates: {
                startDate: picker.startDate.format("MM/DD/YYYY"),
                endDate: picker.endDate.format("MM/DD/YYYY")
            }
        })
        this.retrieveListMembers();
    }

    handleRowClicked(row: any) {

        this.props.history.push(`/member/${row.MemberID}`)
    }

    async retrieveListMembers() {
        const res = await MemberService.getAllMembers(this.state.dates.startDate, this.state.dates.endDate)
        if (res.code !== 200) {
            this.setState({
                listMemberDataTable: [],
                message: res.message,
                errorRaised: true
            });
            return
        }
        this.setState({
            listMemberDataTable: res.result
        });

    }
    render() {
        console.log("listMemberDataTable", this.state.listMemberDataTable)
        const { dates, listMemberDataTable } = this.state
        return (
            <div>
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
                            onApply={this.handleApply}
                        >
                            <input
                                 id="fname"
                                type="text"
                                // value={dates.startDate + "-" + dates.endDate}
                                className="form-control"

                            />
                        </DateRangePicker>
                    </FloatingLabel>
                </Container>
                <Container>
                    <DataTable
                        title="List Member"
                        columns={ThListMembersDatatable}
                        data={listMemberDataTable}
                        pagination
                        onRowClicked={this.handleRowClicked}
                    />
                </Container>
            </div>
        )
    }
}
