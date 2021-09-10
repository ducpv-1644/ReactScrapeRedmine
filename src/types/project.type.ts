export interface ProjectType {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string | null,
    DeletedAt: string | null,
    name: string,
    Prefix: string,
    Issue: null
}

export interface IssueType {
    issue_id: string,
    issue_tracker: string,
    issue_status: string,
    issue_priority: string,
    issue_subject: string,
    issue_assignee: string,
    issue_target_version: string,
    issue_due_date: string,
    issue_estimated_time: string,
    issue_done_ratio: string,
}

interface IssueShortType {
    nameissue: string,
    linkissue: string,
}
export interface MenberType {
    membername: number,
    totalrstimatedtime: number,
    totalspenttime: number,
    TotalIssue: number,
    ListIssue?: IssueShortType,
}

export interface ProjectDetailParamsType {
    project_id?: string,
    project?: string
}
