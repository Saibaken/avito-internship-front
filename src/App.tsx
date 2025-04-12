import { Outlet } from "react-router";
import Header from "./elements/header";

function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;
