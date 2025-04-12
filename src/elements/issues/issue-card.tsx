import { TaskPriorityEnum, TaskShort, TaskStatusEnum } from "@/api/tasks";
import { Button } from "@/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/atoms/avatar";
import { Badge, badgeVariants } from "@/atoms/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/atoms/card";
import { VariantProps } from "class-variance-authority";
import { ChevronsUp, ChevronUp, Minus } from "lucide-react";
import { useMemo } from "react";
import { NavLink } from "react-router";

const statusDictionary: Record<TaskStatusEnum, string> = {
    Backlog: "Бэклог",
    InProgress: "В работе",
    Done: "Завершен",
};

const priorityIcon = (priority: TaskPriorityEnum) => {
    switch (priority) {
        case TaskPriorityEnum.HIGH:
            return <ChevronsUp className="text-red-500" />;
        case TaskPriorityEnum.MEDIUM:
            return <ChevronUp className="text-amber-400" />;
        case TaskPriorityEnum.LOW:
            return <Minus className="text-gray-500" strokeWidth={2.5} />;
        default:
            return <Minus className="text-gray-500" strokeWidth={2.5} />;
    }
};

export function IssueCard({
    assignee,
    boardId,
    boardName,
    id,
    description,
    priority,
    status,
    title,
}: TaskShort) {
    const descriptionSlice =
        description.length > 255
            ? `${description.slice(0, 252)}...`
            : description;

    const statusBadgeVariant: VariantProps<typeof badgeVariants>["variant"] =
        useMemo(() => {
            switch (status) {
                case TaskStatusEnum.BACKLOG:
                    return "gray";
                case TaskStatusEnum.IN_PROGRESS:
                    return "blue";
                case TaskStatusEnum.DONE:
                    return "green";
                default:
                    return "gray";
            }
        }, [status]);

    return (
        <Card className="gap-2">
            <CardHeader>
                <CardTitle className="align-baseline">
                    <div className="flex gap-2 items-middle">
                        <NavLink to={`/issues/${id}`} className="mr-auto">
                            <p>{title}</p>
                        </NavLink>
                        {priorityIcon(priority)}
                    </div>
                </CardTitle>
                <CardDescription>{descriptionSlice}</CardDescription>
            </CardHeader>
            <CardContent className="flex">
                <Badge variant={statusBadgeVariant}>
                    {statusDictionary[status]}
                </Badge>
            </CardContent>
            <CardFooter>
                <NavLink
                    className="flex gap-2 items-center font-medium w-fit mr-auto"
                    to={`/users/${assignee.id}`}
                >
                    <Avatar className="w-6 h-6">
                        <AvatarImage
                            src={assignee.avatarUrl}
                            alt={assignee.fullName}
                        />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <span>{assignee.fullName}</span>
                </NavLink>
                <NavLink to={`/boards/${boardId}`}>
                    <Button variant="outline">
                        Перейти к доске &quot;{boardName}&quot;
                    </Button>
                </NavLink>
            </CardFooter>
        </Card>
    );
}
