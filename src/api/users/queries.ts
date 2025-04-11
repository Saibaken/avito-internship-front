import { useQuery } from "@tanstack/react-query";
import { apiClient, APIError } from "../client";
import { CommonResponse } from "../common-types";
import { UserShort, UserTaskListItem } from "./types";

export const usersUrl = "/users";
export const usersKey = "users";

/** Генератор ключей для запросов пользователей */
export const usersQueryKeys = {
    allUsers: [usersKey],
    userTasks: (id: number) => [usersKey, id],
};

/** Получить список всех пользователей */
export const useUsers = () =>
    useQuery<CommonResponse<UserShort[]>, APIError>({
        queryKey: usersQueryKeys.allUsers,
        queryFn: ({ signal }) => apiClient.get(usersUrl, { signal }),
    });

/** Получить задачи пользователя */
export const useUsersTasks = (id: number) =>
    useQuery<CommonResponse<UserTaskListItem[]>, APIError>({
        queryKey: usersQueryKeys.userTasks(id),
        queryFn: ({ signal }) =>
            apiClient.get(`${usersUrl}/${id}/tasks`, { signal }),
    });
