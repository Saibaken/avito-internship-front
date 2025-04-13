import { TaskPriorityEnum, TaskStatusEnum } from "@/api/tasks";
import { Badge } from "@/atoms/badge";
import { statusDictionary } from "@/consts/issues";
import { ChevronsUp, ChevronUp, Minus } from "lucide-react";

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

export const statusBadge = (status: TaskStatusEnum) => {
    switch (status) {
        case TaskStatusEnum.BACKLOG:
            return <Badge variant="gray">{statusDictionary[status]}</Badge>;
        case TaskStatusEnum.IN_PROGRESS:
            return <Badge variant="blue">{statusDictionary[status]}</Badge>;
        case TaskStatusEnum.DONE:
            return <Badge variant="green">{statusDictionary[status]}</Badge>;
        default:
            return null;
    }
};
