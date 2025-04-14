import { Outlet } from "react-router";
import { Toaster } from "./atoms";
import Header from "./elements/header";

function App() {
    return (
        <>
            <Header />
            <div className="p-4 sm:p-8 space-y-6">
                <Outlet />
            </div>
            <Toaster richColors position="top-right" />
        </>
    );
}

export default App;
