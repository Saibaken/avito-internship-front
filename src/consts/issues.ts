import { TaskPriorityEnum, TaskStatusEnum } from "@/api/tasks";

export const statusDictionary: Record<TaskStatusEnum, string> = {
    Backlog: "Бэклог",
    InProgress: "В работе",
    Done: "Завершен",
};

export const priorityDictionary: Record<TaskPriorityEnum, string> = {
    High: "Высокий",
    Medium: "Средний",
    Low: "Низкий",
};
