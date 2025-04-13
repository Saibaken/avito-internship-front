import { EntityId } from "../common-types";
import { UserShort } from "../users/types";

export enum TaskPriorityEnum {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}

export enum TaskStatusEnum {
    BACKLOG = "Backlog",
    IN_PROGRESS = "InProgress",
    DONE = "Done",
}

export interface Task {
    assignee: UserShort;
    boardId: EntityId;
    boardName: string;
    id: EntityId;
    description: string;
    priority: TaskPriorityEnum;
    status: TaskStatusEnum;
    title: string;
}

export interface TaskShort extends Omit<Task, "boardId"> {}

export interface TaskCreateRequest
    extends Pick<Task, "boardId" | "description" | "priority" | "title"> {
    assigneeId: number;
}

export interface TaskCreateResponse extends Pick<Task, "id"> {}

export interface TaskUpdateRequest {
    taskId: EntityId;
    assigneeId: EntityId;
    description: string;
    priority: TaskPriorityEnum;
    status: TaskStatusEnum;
    title: string;
}
export interface TaskUpdateResponse {
    message: string;
}

export interface TaskUpdateStatusRequest {
    taskId: EntityId;
    status: TaskStatusEnum;
}

export interface TaskUpdateStatusResponse {
    message: string;
}
