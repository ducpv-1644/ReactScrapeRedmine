export default interface ProjectType {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string | null,
    DeletedAt: string | null,
    name: string,
    Prefix: string,
    Issue: null
}
