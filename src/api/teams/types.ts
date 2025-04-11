import { Board } from "../boards/types";
import { EntityId } from "../common-types";
import { UserShort } from "../users/types";

export interface Team {
    boards: Pick<Board, "description" | "id" | "name">[];
    description: string;
    id: EntityId;
    name: string;
    users: (UserShort & { id: EntityId })[];
}

export interface TeamShort {
    boardsCount: number;
    description: string;
    id: EntityId;
    name: string;
    usersCount: number;
}
