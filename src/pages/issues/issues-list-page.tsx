import { useTasks } from "@/api/tasks";
import { IssuesList } from "@/elements/issues";
import { IssueFilters, IssuesFilter } from "@/elements/issues/issue-filters";
import Fuse from "fuse.js";
import { useCallback, useMemo, useState } from "react";

export default function IssuesListPage() {
    const tasks = useTasks();
    const tasksData = tasks.data?.data;

    const [filters, setFilters] = useState<IssuesFilter>({
        status: null,
        priority: null,
        query: "",
    });

    const [searchQuery, setSearchQuery] = useState("");

    const fuseSearch = useMemo(() => {
        if (!tasksData) return;
        return new Fuse(tasksData, {
            includeScore: true,
            keys: ["title", "assignee.fullName"],
        });
    }, [tasksData]);

    const filteredTasks = useMemo(
        () =>
            tasksData?.filter(
                (task) =>
                    (!filters.status || task.status === filters.status) &&
                    (!filters.priority || task.priority === filters.priority)
            ) || [],
        [filters.priority, filters.status, tasksData]
    );

    const getSearchResults = useCallback(
        (query: string) => {
            if (!fuseSearch || !query) return filteredTasks;
            fuseSearch.setCollection(filteredTasks);
            return fuseSearch
                .search(query)
                .filter((result) => result.score! < 0.6)
                .map((searchResult) => searchResult.item);
        },
        [filteredTasks, fuseSearch]
    );

    const displayedTasks = useMemo(
        () => getSearchResults(searchQuery) || [],
        [searchQuery, getSearchResults]
    );

    return (
        <div className="space-y-6">
            <IssueFilters
                className="flex flex-wrap justify-between gap-4 items-end sm:flex-no-wrap"
                onSubmit={setFilters}
                onQueryChange={setSearchQuery}
                initialValues={{
                    ...filters,
                    query: searchQuery,
                }}
            />
            <IssuesList tasks={displayedTasks} />
        </div>
    );
}
