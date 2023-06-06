import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GameBoyColor from "./components/GameBoyColor";
import Menu from "./components/Menu";
import Camera from "./components/Camera";
import GameBoyScreen from "./components/GameBoyScreen";
import Score from "./components/Score";
import Gallery from "./components/Gallery";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameboycolor" element={<GameBoyColor />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/camera" element={<Camera />} />
        <Route
          path="/gallery"
          element={
            <GameBoyScreen>
              <Gallery />
            </GameBoyScreen>
          }
        />
        <Route
          path="/score"
          element={
            <GameBoyScreen>
              <Score />
            </GameBoyScreen>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
