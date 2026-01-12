import { useState } from "react";
import MainScreen from "./screens/MainScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUsScreen from "./screens/AboutUsScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/about-us" element={<AboutUsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
