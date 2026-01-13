import { useState } from "react";
import MainScreen from "./screens/MainScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUsScreen from "./screens/AboutUsScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import CollectionScreen from "./screens/CollectionScreen";
import SingleVehicleScreen from "./screens/SingleVehicleScreen";
import LoginScreen from "./screens/LoginScreen";
import AddVehicleScreen from "./screens/AddVehicleScreen";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/about-us" element={<AboutUsScreen />} />
                <Route path="/contact-us" element={<ContactUsScreen />} />
                <Route path="/collection" element={<CollectionScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/add-vehicle" element={<AddVehicleScreen />} />
                <Route path="/vehicle/:id" element={<SingleVehicleScreen />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
