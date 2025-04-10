import { useLoaderData } from "react-router";

export default function BoardDetail() {
    const { boardId } = useLoaderData<{ boardId: string }>();

    return <div>This is BoardDetail {boardId}</div>;
}
