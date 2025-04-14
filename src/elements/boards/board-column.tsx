import { BoardTaskListItem } from "@/api/boards";
import { useDroppable } from "@dnd-kit/core";
import { DraggableIssueCard } from "../issues/draggable-issue-card";

export function BoardColumn({
    id,
    title,
    issues,
}: {
    id: string;
    title: string;
    issues: BoardTaskListItem[];
}) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="border-2 rounded-sm min-w-72">
            <div className="h-12 w-full bg-card rounded-b-sm px-4 flex items-center">
                <h2 className="text-foreground font-semibold text-2xl">
                    {title}
                </h2>
            </div>
            <ol className="flex flex-col gap-2 p-2 overflow-auto">
                {issues.map((issue) => (
                    <li key={issue.id}>
                        <DraggableIssueCard {...issue} />
                    </li>
                ))}
            </ol>
        </div>
    );
}
