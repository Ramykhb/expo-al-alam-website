import { useState } from "react";
import MainScreen from "./screens/MainScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import F1True3DRoad from "./screens/AboutUsScreen";
import F1FinalRoad from "./screens/AboutUsScreen";
import AboutUsExpo from "./screens/AboutUsScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/about-us" element={<AboutUsExpo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
