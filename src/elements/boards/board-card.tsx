import { Board } from "@/api/boards";
import { Button } from "@/atoms";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/atoms/card";
import { stringDeclension } from "@/lib/utils";
import { NavLink } from "react-router";

export function BoardCard({ id, description, name, taskCount }: Board) {
    return (
        <Card className="gap-0">
            <CardHeader>
                <NavLink to={`/boards/${id}`}>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>
                        На доске {taskCount}{" "}
                        {stringDeclension(taskCount, [
                            "задач",
                            "задача",
                            "задач",
                        ])}
                    </CardDescription>
                </NavLink>
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap justify-between items-baseline">
                <p>{description}</p>
                <NavLink to={`/boards/${id}`}>
                    <Button variant="ghost" className="cursor-pointer">
                        Перейти к доске
                    </Button>
                </NavLink>
            </CardContent>
        </Card>
    );
}
