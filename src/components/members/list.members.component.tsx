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
    startDate: string,
    endDate: string
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

        this.state = {
            dates: {
                startDate: "",
                endDate: ""
            },
            message: "",
            listMemberDataTable: [],
            errorRaised: false
        };
    }

    componentDidMount() {
        this.retrieveListMembers();
    }

    handleRowClicked(row: any) {
        this.props.history.push(`/member/${row.MemberID}`)
    }

    async retrieveListMembers() {
        const res = await MemberService.getAllMembers()
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
