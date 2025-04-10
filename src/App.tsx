import Header from "@/elements/header";
import { Outlet } from "react-router";

function App() {
    return (
        <div className="h-screen w-screen bg-slate-800">
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
