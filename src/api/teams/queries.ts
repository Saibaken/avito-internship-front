import { useQuery } from "@tanstack/react-query";
import { apiClient, APIError } from "../client";
import { CommonResponse } from "../common-types";
import { Team, TeamShort } from "./types";

export const teamsUrl = "/teams";
export const teamsKey = "teams";

/** Генератор ключей команд */
export const teamsQueryKeys = {
    allTeams: [teamsKey],
    getTeam: (id: number) => [teamsKey, id],
};

/** Получить список всех команд */
export const useTeams = () =>
    useQuery<CommonResponse<TeamShort[]>, APIError>({
        queryKey: teamsQueryKeys.allTeams,
        queryFn: ({ signal }) => apiClient.get(teamsUrl, { signal }),
    });

/** Получить детальную страницу команды */
export const useTeamDetail = (id: number) =>
    useQuery<CommonResponse<Team[]>, APIError>({
        queryKey: teamsQueryKeys.getTeam(id),
        queryFn: ({ signal }) => apiClient.get(`${teamsUrl}/${id}`, { signal }),
    });
