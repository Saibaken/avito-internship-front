import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, APIError } from "../client";
import { CommonResponse } from "../common-types";
import {
    Task,
    TaskCreateRequest,
    TaskCreateResponse,
    TaskShort,
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
    useQuery<CommonResponse<TaskShort[]>, APIError>({
        queryKey: [tasksKey],
        queryFn: ({ signal }) => apiClient.get(tasksUrl, { signal }),
    });

/** Создать задачу */
export const useTaskCreate = (data: TaskCreateRequest) => {
    const queryClient = useQueryClient();

    return useMutation<TaskCreateResponse, APIError, TaskCreateRequest>({
        mutationFn: () => apiClient.post(`${tasksUrl}/create`, { data }),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [tasksKey] }),
    });
};

/** Обновить поля задачи */
export const useTaskUpdate = (data: TaskUpdateRequest) => {
    const queryClient = useQueryClient();

    const { taskId, ...restData } = data;

    return useMutation<TaskUpdateResponse, APIError, TaskUpdateRequest>({
        mutationFn: () =>
            apiClient.post(`${tasksUrl}/update/${taskId}`, { data: restData }),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [tasksKey, taskId] }),
    });
};

/** Обновить статус задачи */
export const useTaskUpdateStatus = (data: TaskUpdateStatusRequest) => {
    const queryClient = useQueryClient();

    const { taskId, ...restData } = data;

    return useMutation<
        TaskUpdateStatusResponse,
        APIError,
        TaskUpdateStatusRequest
    >({
        mutationFn: () =>
            apiClient.post(`${tasksUrl}/updateStatus/${taskId}`, {
                data: restData,
            }),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [tasksKey, taskId] }),
    });
};

/** Получить детальную страницу задачи */
export const useTaskDetail = (id: number) =>
    useQuery<{ id: number }, APIError, Task>({
        queryKey: [tasksKey, id],
        queryFn: ({ signal }) => apiClient.get(`${tasksUrl}/${id}`, { signal }),
    });
