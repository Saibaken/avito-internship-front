import { useBoards } from "@/api/boards";
import { Skeleton } from "@/atoms";
import { BoardCard } from "@/elements/boards";

export function BoardsList() {
    const boards = useBoards();
    const boardsData = boards.data;

    if (boards.isLoading) {
        return <Skeleton className="w-full h-20" />;
    }

    return (
        <ol className="flex flex-col gap-4">
            {boardsData?.data.map((board) => (
                <li key={board.id}>
                    <BoardCard {...board} />
                </li>
            ))}
        </ol>
    );
}
