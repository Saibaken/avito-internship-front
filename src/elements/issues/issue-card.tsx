import { Button } from "@/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/atoms/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/atoms/card";
import { NavLink } from "react-router";
import { priorityIcon, statusBadge } from "./common";
import { Task } from "@/api/tasks";

export function IssueCard({
    assignee,
    boardId,
    boardName,
    id,
    description,
    priority,
    status,
    title,
}: Task) {
    const descriptionSlice =
        description.length > 255
            ? `${description.slice(0, 252)}...`
            : description;

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
            <CardContent className="flex">{statusBadge(status)}</CardContent>
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
