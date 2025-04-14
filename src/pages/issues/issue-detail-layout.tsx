import { Dialog, DialogContent, DialogHeader } from "@/atoms";
import { CreateIssueForm, UpdateIssueForm } from "@/ogranisms/issue-form";
import { useIssueFormStore } from "@/stores/useIssuePopup";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useShallow } from "zustand/shallow";

export default function IssueDetailLayout() {
    const [isOpen, mode, open, close, taskId, boardId] = useIssueFormStore(
        useShallow((state) => [
            state.isOpen,
            state.mode,
            state.open,
            state.close,
            state.taskId,
            state.boardId,
        ])
    );

    const location = useLocation();

    useEffect(() => {
        close();
    }, [close, location]);

    const changePopupVisibility = useCallback(
        (openChange: boolean) => {
            if (!openChange) close();
            if (openChange) open("create");
            return;
        },
        [close, open]
    );

    return (
        <Dialog open={isOpen} onOpenChange={changePopupVisibility}>
            <Outlet />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create"
                            ? "Создание задачи"
                            : "Редактирование задачи"}
                    </DialogTitle>
                </DialogHeader>
                {mode === "create" && (
                    <CreateIssueForm onSuccess={close} boardId={boardId} />
                )}
                {mode === "update" && taskId && boardId && (
                    <UpdateIssueForm
                        onSuccess={close}
                        taskId={taskId}
                        boardId={boardId}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
