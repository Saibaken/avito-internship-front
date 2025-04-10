import { Button } from "@/atoms";
import { NavLink } from "react-router";

const pages: { link: string; name: string }[] = [
    { link: "/boards", name: "Проекты" },
    { link: "/issues", name: "Все задачи" },
];

export default function Header() {
    return (
        <div className="w-full h-10 flex gap-8 items-center p-8">
            {pages.map((page) => (
                <NavLink
                    to={page.link}
                    className={({ isActive }) =>
                        `text-xl font-bold ${isActive ? "text-red-600" : "text-white"}`
                    }
                >
                    {page.name}
                </NavLink>
            ))}
            <Button
                variant="outline"
                className="text-sm cursor-pointer ml-auto"
            >
                Создать задачу
            </Button>
        </div>
    );
}
