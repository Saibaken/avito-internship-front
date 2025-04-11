import { useQuery } from "@tanstack/react-query";
import { apiClient, APIError } from "../client";
import { CommonResponse } from "../common-types";
import { Board, BoardTaskListItem } from "./types";

export const boardsUrl = "/boards";
export const boardsKey = "boards";

/** Генератор ключей для досок */
export const boardsQueryKeys = {
    allBoards: [boardsKey],
    getBoardTasks: (id: number) => [boardsKey, id],
};

/** Получить список досок */
export const useBoards = () =>
    useQuery<CommonResponse<Board[]>, APIError>({
        queryKey: boardsQueryKeys.allBoards,
        queryFn: ({ signal }) => apiClient.get(boardsUrl, { signal }),
    });

/** Получить список задач доски */
export const useBoardDetail = (id: number) =>
    useQuery<CommonResponse<BoardTaskListItem[]>, APIError>({
        queryKey: boardsQueryKeys.getBoardTasks(id),
        queryFn: ({ signal }) =>
            apiClient.get(`${boardsUrl}/${id}`, { signal }),
    });
