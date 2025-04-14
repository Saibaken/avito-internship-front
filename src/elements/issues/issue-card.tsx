import { Task } from "@/api/tasks";
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
import { useIssueFormStore } from "@/stores/useIssuePopup";
import { Mail } from "lucide-react";
import { NavLink } from "react-router";
import { useShallow } from "zustand/shallow";
import { priorityIcon, statusBadge } from "./common";

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
    const [openPopup] = useIssueFormStore(
        useShallow((state) => [state.open, state.close])
    );

    const descriptionSlice =
        description.length > 255
            ? `${description.slice(0, 252)}...`
            : description;

    return (
        <Card className="gap-2">
            <CardHeader>
                <CardTitle className="align-end">
                    <div className="flex gap-2 items-middle">
                        <button
                            className="mr-auto cursor-pointer"
                            onClick={() =>
                                openPopup("update", {
                                    taskId: id,
                                    boardId: Number(boardId),
                                })
                            }
                        >
                            {title}
                        </button>
                        {priorityIcon(priority)}
                    </div>
                </CardTitle>
                <CardDescription>{descriptionSlice}</CardDescription>
            </CardHeader>
            <CardContent className="flex">{statusBadge(status)}</CardContent>
            <CardFooter className="flex flex-col flex-wrap sm:flex-row">
                <div className="flex gap-2 items-center font-medium w-fit mr-auto">
                    <NavLink
                        to={`/users/${assignee.id}`}
                        className="flex gap-2"
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
                    <NavLink to={`mailto:${assignee.email}`}>
                        <Button variant="ghost" className="cursor-pointer">
                            <Mail />
                        </Button>
                    </NavLink>
                </div>
                <NavLink
                    to={`/boards/${boardId}`}
                    className="max-w-full overflow-hidden whitespace-nowrap"
                >
                    <Button variant="outline" className="overflow-ellipsis">
                        Перейти к доске &quot;{boardName}&quot;
                    </Button>
                </NavLink>
            </CardFooter>
        </Card>
    );
}
