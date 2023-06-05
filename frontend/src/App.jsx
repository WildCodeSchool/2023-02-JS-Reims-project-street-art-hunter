import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Camera from "./components/Camera";
import Register from "./pages/Register";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
