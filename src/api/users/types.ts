import { EntityId } from "../common-types";
import { Task } from "../tasks/types";

export interface User {
    avatarUrl: string;
    description: string;
    email: string;
    fullName: string;
    id: EntityId;
    tasksCount: number;
    teamId: number;
    teamName: string;
}

export interface UserShort
    extends Pick<User, "avatarUrl" | "email" | "fullName" | "id"> {}

export interface UserTaskListItem extends Omit<Task, "assignee" | "boardId"> {}
