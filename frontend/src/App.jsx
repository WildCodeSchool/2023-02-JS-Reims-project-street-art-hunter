import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import GameBoy from "./components/GameBoy";
import GameBoyScreen from "./components/GameBoyScreen";
import Menu from "./components/Menu";
import Camera from "./components/Camera";
import Score from "./components/Score";
import Gallery from "./components/Gallery";

import "./App.scss";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { token, setToken } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/camera" element={<Camera />} />
        {token == null ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <button type="button" onClick={() => setToken(null)}>
            Déconnexion
          </button>
        )}

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
