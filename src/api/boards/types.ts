import { EntityId } from "../common-types";
import { Task } from "../tasks/types";

export interface Board {
    description: string;
    id: EntityId;
    name: string;
    taskCount: number;
}

export interface BoardTaskListItem
    extends Omit<Task, "boardId" | "boardName"> {}
