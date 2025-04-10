import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import BoardDetail from "./pages/boards/board-detail.tsx";
import BoardsList from "./pages/boards/boards-list.tsx";
import IssueDetail from "./pages/issues/issue-detail.tsx";
import IssuesList from "./pages/issues/issues-list.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/boards" />,
    },
    {
        Component: App,
        children: [
            {
                path: "boards",
                children: [
                    { index: true, Component: BoardsList },
                    {
                        path: ":boardId",
                        Component: BoardDetail,
                        loader: ({ params }) => ({
                            boardId: params.boardId,
                        }),
                    },
                ],
            },
            {
                path: "issues",
                children: [
                    { index: true, Component: IssuesList },
                    {
                        path: ":issueId",
                        Component: IssueDetail,
                        loader: ({ params }) => ({ issueId: params.issueId }),
                    },
                ],
            },
        ],
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
