const issues = [1, 2, 3];

export default function IssuesList() {
    return (
        <>
            {issues.map((issue) => (
                <div className="bg-slate-400">{issue}</div>
            ))}
        </>
    );
}
