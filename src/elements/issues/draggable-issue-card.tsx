import { BoardTaskListItem } from "@/api/boards";
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
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Mail } from "lucide-react";
import { ReactNode } from "react";
import { NavLink, useLoaderData } from "react-router";
import { priorityIcon, statusBadge } from "./common";

export function DraggableIssueCard({
    assignee,
    id,
    description,
    priority,
    status,
    title,
}: BoardTaskListItem & { gripHandle?: ReactNode }) {
    const { boardId } = useLoaderData<{ boardId: string }>();
    const openPopup = useIssueFormStore((state) => state.open);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: {
            status,
        },
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const descriptionSlice =
        description.length > 100
            ? `${description.slice(0, 97)}...`
            : description;

    return (
        <Card className="gap-2" style={style} ref={setNodeRef}>
            <CardHeader>
                <CardTitle className="align-end">
                    <div className="flex gap-2 items-middle">
                        <GripVertical
                            {...attributes}
                            {...listeners}
                            className="cursor-grab"
                        />
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
            <CardFooter>
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
            </CardFooter>
        </Card>
    );
}
