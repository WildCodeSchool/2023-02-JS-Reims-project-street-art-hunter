import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Camera from "./components/Camera";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </div>
  );
}

export default App;
