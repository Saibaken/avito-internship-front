import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import BoardDetail from "./pages/boards/board-detail.tsx";
import BoardsListPage from "./pages/boards/boards-list-page.tsx";
import IssueDetailLayout from "./pages/issues/issue-detail-layout.tsx";
import IssuesListPage from "./pages/issues/issues-list-page.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/boards" />,
    },
    {
        Component: App,
        children: [
            {
                Component: IssueDetailLayout,
                children: [
                    {
                        path: "boards",
                        children: [
                            { index: true, Component: BoardsListPage },
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
                        children: [{ index: true, Component: IssuesListPage }],
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
            <ReactQueryDevtools />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
