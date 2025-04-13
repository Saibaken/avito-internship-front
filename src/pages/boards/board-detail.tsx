import { useBoardDetail, useBoards } from "@/api/boards";
import { TaskStatusEnum, useTaskUpdateStatus } from "@/api/tasks";
import { Skeleton } from "@/atoms";
import { BoardColumn } from "@/elements/boards/board-column";
import { statusDictionary } from "@/elements/issues/common";
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useCallback } from "react";
import { useLoaderData } from "react-router";

const taskStatuses: TaskStatusEnum[] = [
    TaskStatusEnum.BACKLOG,
    TaskStatusEnum.IN_PROGRESS,
    TaskStatusEnum.DONE,
];

export default function BoardDetail() {
    const { boardId } = useLoaderData<{ boardId: string }>();
    const allBoards = useBoards();
    const boardDetail = useBoardDetail(Number(boardId));
    const updateTaskStatus = useTaskUpdateStatus();

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const getIssuesByStatus = useCallback(
        (status: TaskStatusEnum) =>
            boardDetail.data?.data.filter((issue) => issue.status === status) ||
            [],
        [boardDetail.data?.data]
    );

    const onDragEnd = useCallback(
        (event: DragEndEvent) => {
            const taskId = event.active.id;
            const prevStatus = event.active.data.current?.status;
            const status = event.over?.id;
            if (!!status && status !== prevStatus) {
                updateTaskStatus.mutateAsync({
                    taskId: Number(taskId),
                    status: status as TaskStatusEnum,
                    boardId: Number(boardId),
                });
            }
        },
        [boardId, updateTaskStatus]
    );

    if (boardDetail.isLoading)
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((col) => (
                        <Skeleton key={col} className="h-32 w-full" />
                    ))}
                </div>
            </div>
        );

    const currentBoard = allBoards.data?.data.find(
        (board) => board.id === Number(boardId)
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {currentBoard?.name || `Доска №${boardId}`}
            </h1>
            <DndContext sensors={sensors} onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-2">
                    {taskStatuses.map((status) => (
                        <BoardColumn
                            title={statusDictionary[status]}
                            id={status}
                            key={status}
                            issues={getIssuesByStatus(status)}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    );
}
