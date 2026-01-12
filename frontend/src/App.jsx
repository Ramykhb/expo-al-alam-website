import { useState } from "react";
import MainScreen from "./screens/MainScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
