import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GameBoyColor from "./components/GameBoyColor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/Menu";
import Camera from "./components/Camera";
import GameBoyScreen from "./components/GameBoyScreen";
import Score from "./components/Score";
import Gallery from "./components/Gallery";
import StreetArtsList from "./components/StreetArtsList";
import "./App.scss";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { token, setToken } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameboycolor" element={<GameBoyColor />} />
        <Route path="/menu" element={<Menu />} />
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
          path="/street-arts"
          element={
            <GameBoyScreen>
              <StreetArtsList />
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
