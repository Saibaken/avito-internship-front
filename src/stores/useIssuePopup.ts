import { create } from "zustand";

type IssueFormMode = "create" | "update";

interface IssueFormState {
    isOpen: boolean;
    mode: IssueFormMode;
    taskId?: number;
    boardId?: number;

    open: (
        mode: IssueFormMode,
        options?: { taskId?: number; boardId?: number }
    ) => void;
    close: () => void;
}

export const useIssueFormStore = create<IssueFormState>((set) => ({
    isOpen: false,
    mode: "create",
    taskId: undefined,
    boardId: undefined,

    open: (mode, options) =>
        set({
            isOpen: true,
            mode,
            taskId: options?.taskId,
            boardId: options?.boardId,
        }),

    close: () =>
        set({
            isOpen: false,
            taskId: undefined,
            boardId: undefined,
        }),
}));
