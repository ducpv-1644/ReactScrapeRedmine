export default interface ProjectType {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string | null,
    DeletedAt: string | null,
    name: string,
    Prefix: string,
    Issue: null
}

export default interface IssueType {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string | null,
    DeletedAt: string | null,
    issue_id: string,
    issue_project: string,
    issue_tracker: string,
    issue_subject: string,
    issue_status: string,
    issue_priority: string,
    issue_assignee: string,
    issue_target_version: string,
    issue_due_date: string,
    issue_estimated_time: string,
    issue_category: string,
    issue_story_point: string,
    issue_link: string,
    issue_actual_start_date: string,
    issue_actual_end_date: string,
    issue_git_url: string,
    issueq_a_deadline: string,
    issue_start_date: string,
    issue_done_ratio: string,
    issue_spent_time: string,
    issue_author: string,
    issue_created: string,
    issue_updated: string,
}

interface IssueShortType {
    nameissue: string,
    linkissue: string,
}
export default interface MenberType {
    membername: number,
    totalrstimatedtime: number,
    totalspenttime: number,
    TotalIssue: number,
    ListIssue: IssueShortType,
}
