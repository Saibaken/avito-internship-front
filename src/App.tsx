import { Outlet } from "react-router";

function App() {
    return (
        <div className="h-screen w-screen bg-slate-800">
            <Outlet />
        </div>
    );
}

export default App;
