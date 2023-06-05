import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Camera from "./components/Camera";
import GameBoy from "./components/GameBoy";
import GameBoyScreen from "./components/GameBoyScreen";
import Gallery from "./components/Gallery";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/camera" element={<Camera />} />
        <Route
          path="/gallery"
          element={
            <GameBoyScreen>
              <Gallery />
            </GameBoyScreen>
          }
        />
        {/* route de dev */}
        <Route path="/gameboy" element={<GameBoy />} />
        <Route path="/gameboy/screen" element={<GameBoyScreen />} />
        <Route
          path="/gameboy/screen/test"
          element={<GameBoyScreen>test</GameBoyScreen>}
        />
      </Routes>
    </div>
  );
}

export default App;
