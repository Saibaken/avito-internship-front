import { TaskPriorityEnum, TaskStatusEnum } from "@/api/tasks";
import { badgeVariants } from "@/atoms/badge";
import { VariantProps } from "class-variance-authority";
import { ChevronsUp, ChevronUp, Minus } from "lucide-react";

export const statusDictionary: Record<TaskStatusEnum, string> = {
    Backlog: "Бэклог",
    InProgress: "В работе",
    Done: "Завершен",
};

export const priorityIcon = (priority: TaskPriorityEnum) => {
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

export const getStatusBadgeVariant: (
    status: TaskStatusEnum
) => VariantProps<typeof badgeVariants>["variant"] = (
    status: TaskStatusEnum
) => {
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
};
