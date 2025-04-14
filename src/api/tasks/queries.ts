import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardsQueryKeys } from "../boards";
import { apiClient, APIError } from "../client";
import { CommonResponse } from "../common-types";
import {
    Task,
    TaskCreateRequest,
    TaskCreateResponse,
    TaskUpdateRequest,
    TaskUpdateResponse,
    TaskUpdateStatusRequest,
    TaskUpdateStatusResponse,
} from "./types";

export const tasksUrl = "/tasks";
export const tasksKey = "tasks";

/** Генератор ключей задач */
export const tasksQueryKeys = {
    allTasks: [tasksKey],
    getTask: (id: number) => [tasksKey, id],
};

/** Получить список всех задач */
export const useTasks = () =>
    useQuery<CommonResponse<Task[]>, APIError>({
        queryKey: tasksQueryKeys.allTasks,
        queryFn: ({ signal }) => apiClient.get(tasksUrl, { signal }),
    });

/** Создать задачу */
export const useTaskCreate = () => {
    const queryClient = useQueryClient();

    return useMutation<TaskCreateResponse, APIError, TaskCreateRequest>({
        mutationFn: (data) => apiClient.post(`${tasksUrl}/create`, { ...data }),
        onSuccess: (_, request) => {
            queryClient.invalidateQueries({
                queryKey: tasksQueryKeys.allTasks,
            });
            queryClient.invalidateQueries({
                queryKey: boardsQueryKeys.getBoardTasks(request.boardId),
            });
            queryClient.invalidateQueries({
                queryKey: boardsQueryKeys.allBoards,
            });
        },
    });
};

/** Обновить поля задачи */
export const useTaskUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation<
        TaskUpdateResponse,
        APIError,
        TaskUpdateRequest & { boardId: number }
    >({
        mutationFn: (data) => {
            const { taskId, ...restData } = data;

            return apiClient.put(`${tasksUrl}/update/${taskId}`, {
                ...restData,
            });
        },
        onSuccess: (_, request) => {
            queryClient.invalidateQueries({
                queryKey: tasksQueryKeys.getTask(request.taskId),
            });
            queryClient.invalidateQueries({
                queryKey: boardsQueryKeys.getBoardTasks(request.boardId),
            });
        },
    });
};

/** Обновить статус задачи */
export const useTaskUpdateStatus = () => {
    const queryClient = useQueryClient();

    return useMutation<
        TaskUpdateStatusResponse,
        APIError,
        TaskUpdateStatusRequest & { boardId: number }
    >({
        mutationFn: (data) => {
            const { taskId, ...restData } = data;
            return apiClient.put(`${tasksUrl}/updateStatus/${taskId}`, {
                ...restData,
            });
        },
        onSuccess: (_, request) => {
            queryClient.invalidateQueries({
                queryKey: tasksQueryKeys.getTask(request.taskId),
            });
            queryClient.invalidateQueries({
                queryKey: boardsQueryKeys.getBoardTasks(request.boardId),
            });
        },
    });
};

/** Получить детальную страницу задачи */
export const useTaskDetail = (id: number) =>
    useQuery<{ id: number }, APIError, CommonResponse<Task>>({
        queryKey: tasksQueryKeys.getTask(id),
        queryFn: ({ signal }) => apiClient.get(`${tasksUrl}/${id}`, { signal }),
    });
