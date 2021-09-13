export const ThListIssuesDatatable = [
    {
        label: '#',
        field: 'issue_id',
        width: 150,
        attributes: {
            'aria-controls': 'DataTable',
            'aria-label': '#',
        },
    },
    {
        label: 'Tracker',
        field: 'issue_tracker',
        width: 270,
    },
    {
        label: 'Status',
        field: 'issue_status',
        width: 200,
    },
    {
        label: 'Priority',
        field: 'issue_priority',
        sort: 'asc',
        width: 100,
    },
    {
        label: 'Subject',
        field: 'issue_subject',
        sort: 'disabled',
        width: 150,
    },
    {
        label: 'Assignee',
        field: 'issue_assignee',
        sort: 'disabled',
        width: 100,
    },
    {
        label: 'Target version',
        field: 'issue_target_version',
        sort: 'disabled',
        width: 100,
    },
    {
        label: 'Due date',
        field: 'issue_due_date',
        sort: 'disabled',
        width: 100,
    },
    {
        label: 'Estimated time',
        field: 'issue_estimated_time',
        sort: 'disabled',
        width: 100,
    },
    {
        label: '% Done',
        field: 'issue_done_ratio',
        sort: 'disabled',
        width: 100,
    },
]

export const ThListMemberDatatable = [
    {
        label: 'Name',
        field: 'membername',
        width: 150,
        attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
        },
    },
    {
        label: 'Total estimated time',
        field: 'totalrstimatedtime',
        width: 270,
    },
    {
        label: 'Total spent time',
        field: 'totalspenttime',
        width: 200,
    },
    {
        label: 'Total Issue',
        field: 'TotalIssue',
        sort: 'asc',
        width: 100,
    }
]
