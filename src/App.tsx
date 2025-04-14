import { Outlet } from "react-router";
import Header from "./elements/header";

function App() {
    return (
        <>
            <Header />
            <div className="p-8 space-y-6">
                <Outlet />
            </div>
        </>
    );
}

export default App;
