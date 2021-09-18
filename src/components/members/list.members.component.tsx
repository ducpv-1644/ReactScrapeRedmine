import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import React, { Component } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { FloatingLabel, Form, Container, InputGroup, FormControl, Button } from 'react-bootstrap'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import DataTable from "react-data-table-component";
import NavbarComponent from 'components/layout/layout.component'
import { ThListMembersDatatable } from './constants';
import MemberService from '../../services/member.service'
import { TextField, ClearButton } from './styled'

type RangeDate = {
    startDate: string,
    endDate: string
};

type State = {
    dates: RangeDate,
    message: string,
    listMemberDataTable: Array<any>,
    errorRaised: boolean,
    filterText: string,
    filteredItems: Array<any>,
    resetPaginationToggle: boolean
};

export default class ListMembers extends Component<RouteComponentProps, State> {
    constructor(props: any) {
        super(props);
        this.retrieveListMembers = this.retrieveListMembers.bind(this);
        this.handleRowClicked = this.handleRowClicked.bind(this);
        this.getSubHeaderComponent = this.getSubHeaderComponent.bind(this);

        this.state = {
            dates: {
                startDate: "",
                endDate: ""
            },
            message: "",
            listMemberDataTable: [],
            errorRaised: false,
            filterText: "",
            resetPaginationToggle: false,
            filteredItems: []
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
            listMemberDataTable: res.result,
            filteredItems: res.result
        });
    }

    setFilterText(newFilterText: string) {
        this.setState({
            filterText: newFilterText
        });
    }

    setFilteredItems() {
        this.setState({
            resetPaginationToggle: true,
            filteredItems: this.state.listMemberDataTable.filter(
                item => item.MemberName && item.MemberName.toLowerCase().includes(this.state.filterText.toLowerCase()) || item.ProjectName && item.ProjectName.toLowerCase().includes(this.state.filterText.toLowerCase()),
            )
        });
    }

    getSubHeaderComponent = () => {
        const FilterComponent = ({ filterText, onFilter, onChange }: { filterText: any, onFilter: any, onChange: any }) => (
            <>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search by member or project"
                        aria-label="Search by member or project"
                        aria-describedby="basic-addon2"
                        value={filterText}
                        onChange={onChange}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={onFilter}>
                        Search
                    </Button>
                </InputGroup>
            </>
        );
        return (
            <FilterComponent
                onFilter={(e: any) => {
                    this.setFilteredItems()
                }}
                onChange={(e: any) => {
                    this.setFilterText(e.target.value)
                }}
                filterText={this.state.filterText}
            />
        );
    };

    render() {
        const { dates, listMemberDataTable, filterText, resetPaginationToggle, filteredItems } = this.state
        // let dataTable = filteredItems
        // if (filterText === "") {
        //     dataTable  = listMemberDataTable
        // }
        // const filteredItems = listMemberDataTable.filter(
        //     item => item.MemberName && item.MemberName.toLowerCase().includes(filterText.toLowerCase()),
        // );
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
                        title="List Member"
                        columns={ThListMembersDatatable}
                        data={filteredItems}
                        pagination
                        onRowClicked={this.handleRowClicked}
                        paginationResetDefaultPage={resetPaginationToggle}
                        subHeader
                        subHeaderComponent={this.getSubHeaderComponent()}
                        persistTableHead
                    />
                </Container>
            </div>
        )
    }
}
