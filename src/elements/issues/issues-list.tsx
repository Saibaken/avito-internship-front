import { Task } from "@/api/tasks";
import { IssueCard } from "@/elements/issues";

export function IssuesList({ tasks }: { tasks: Task[] }) {
    return (
        <ol className="flex flex-col gap-4">
            {tasks.map((issue) => (
                <li key={issue.id}>
                    <IssueCard {...issue} />
                </li>
            ))}
        </ol>
    );
}
