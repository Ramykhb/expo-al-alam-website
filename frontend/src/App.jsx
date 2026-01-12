import { useState } from "react";
import MainScreen from "./screens/MainScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUsScreen from "./screens/AboutUsScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import CollectionScreen from "./screens/CollectionScreen";
import SingleVehicleScreen from "./screens/SingleVehicleScreen";

function App() {
    const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/about-us" element={<AboutUsScreen />} />
                <Route path="/contact-us" element={<ContactUsScreen />} />
                <Route path="/collection" element={<CollectionScreen />} />
                <Route path="/vehicle/:id" element={<SingleVehicleScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
