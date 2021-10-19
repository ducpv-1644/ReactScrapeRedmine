
export const ThListMembersDatatable = [
    {
        name: '#',
        selector:(row:any) => row.MemberID,
        sortable: true,
    },
    {
        name: 'Member name',
        selector: (row:any) => row.MemberName,
    },
    {
        name: 'Projects',
        selector: (row:any) => row.ProjectName,
    },
    {
        name: 'Total Estimated Time',
        selector: (row:any) => row.SumEstimatedTime,
        sortable: true,
    },
    {
        name: 'Total Spent Time',
        selector: (row:any) => row.SumSpentTime,
        sortable: true,
    }
]

export const ThListIssueDatatable =[
    {
        name: '#',
        selector: (row:any) => row.issue_id,
        sortable: true,
    },
    {
        name: 'Project',
        selector:(row:any) => row.issue_project,
    },
    {
        name: 'Tracker',
        selector: (row:any) => row.issue_tracker,
    },
    {
        name: 'Status',
        selector:(row:any) => row.issue_status,
        sortable: true,
    },
    {
        name: 'Priority',
        selector: (row:any) => row.issue_priority,
        sortable: true,
    },
    {
        name: 'Subject',
        selector: (row:any) => row.issue_subject,
    },
    {
        name: 'Assignee',
        selector: (row:any) => row.issue_assignee,
    },
    {
        name: 'Target version',
        selector: (row:any) => row.issue_target_version,
    },
    {
        name: 'Due date',
        selector: (row:any) => row.issue_due_date,
        sortable: true,
    },
    {
        name: 'Estimated time',
        selector: (row:any) => row.issue_estimated_time,
        sortable: true,
    },
    {
        name: '%Done',
        selector: (row:any) => row.issue_done_ratio,
        sortable: true,
    },
]
