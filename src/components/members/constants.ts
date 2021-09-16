export const ThListMembersDatatable = [
    {
        name: '#',
        selector: 'MemberID',
        sortable: true,
    },
    {
        name: 'Member name',
        selector: 'MemberName',
    },
    {
        name: 'Projects',
        selector: 'ProjectName',
    },
    {
        name: 'Total Estimated Time',
        selector: 'SumEstimatedTime',
        sortable: true,
    },
    {
        name: 'Total Spent Time',
        selector: 'SumSpentTime',
        sortable: true,
    }
]

export const ThListIssueDatatable =[
    {
        name: '#',
        selector: 'issue_id',
        sortable: true,
    },
    {
        name: 'Project',
        selector: 'issue_project',
    },
    {
        name: 'Tracker',
        selector: 'issue_tracker',
    },
    {
        name: 'Status',
        selector: 'issue_status',
        sortable: true,
    },
    {
        name: 'Priority',
        selector: 'issue_priority',
        sortable: true,
    },
    {
        name: 'Subject',
        selector: 'issue_subject',
    },
    {
        name: 'Assignee',
        selector: 'issue_assignee',
    },
    {
        name: 'Target version',
        selector: 'issue_target_version',
    },
    {
        name: 'Due date',
        selector: 'issue_due_date',
        sortable: true,
    },
    {
        name: 'Estimated time',
        selector: 'issue_estimated_time',
        sortable: true,
    },
    {
        name: '%Done',
        selector: 'issue_done_ratio',
        sortable: true,
    },
]
