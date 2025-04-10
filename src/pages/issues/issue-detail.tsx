import { useLoaderData } from "react-router";

export default function IssueDetail() {
    const { issueId } = useLoaderData<{ issueId: string }>();

    return <div>This is IssueDetail {issueId}</div>;
}
