import { useTasks } from "@/api/tasks";
import { Skeleton } from "@/atoms";
import { IssueCard } from "@/elements/issues";

export function IssuesList() {
    const tasks = useTasks();
    const tasksData = tasks.data;

    if (tasks.isLoading) {
        return <Skeleton className="w-full h-20" />;
    }

    return (
        <ol className="flex flex-col gap-4">
            {tasksData?.data.map((issue) => (
                <li key={issue.id}>
                    <IssueCard {...issue} />
                </li>
            ))}
        </ol>
    );
}
