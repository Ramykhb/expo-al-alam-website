import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import MainScreen from "./screens/MainScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MainScreen />
    </>
  );
}

export default App;
