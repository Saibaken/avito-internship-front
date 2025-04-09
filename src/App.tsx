import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-slate-800">
            <Button onClick={() => setCount((prev) => prev + 1)}>
                Count is {count}
            </Button>
        </div>
    );
}

export default App;
