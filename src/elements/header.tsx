import { Button } from "@/atoms";
import { useIssueFormStore } from "@/stores/useIssuePopup";
import { useShallow } from "zustand/shallow";

import { useCallback } from "react";
import { NavLink, useMatch } from "react-router";

const pages: { link: string; name: string }[] = [
    { link: "/boards", name: "Проекты" },
    { link: "/issues", name: "Все задачи" },
];

export default function Header() {
    const openIssueForm = useIssueFormStore(useShallow((state) => state.open));
    const match = useMatch("/boards/:id");
    const createIssue = useCallback(
        () =>
            match
                ? openIssueForm("create", { boardId: Number(match.params.id) })
                : openIssueForm("create"),
        [match, openIssueForm]
    );

    return (
        <div className="w-full h-10 flex gap-8 items-center p-8 sticky top-0 bg-background z-10 shadow-sm">
            {pages.map((page) => (
                <NavLink
                    to={page.link}
                    className={({ isActive }) =>
                        `text-xl font-bold ${isActive ? "text-red-600" : "text-foreground"}`
                    }
                    key={page.link}
                >
                    {page.name}
                </NavLink>
            ))}
            <Button
                variant="outline"
                className="text-sm cursor-pointer ml-auto"
                onClick={createIssue}
            >
                Создать задачу
            </Button>
        </div>
    );
}
