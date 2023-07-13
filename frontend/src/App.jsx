import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GameBoyColor from "./components/GameBoyColor";
import Menu from "./components/Menu";
import Camera from "./components/Camera";
import GameBoyScreen from "./components/GameBoyScreen";
import Score from "./components/Score";
import Gallery from "./components/Gallery";
import StreetArtsList from "./components/StreetArtsList";
import Connection from "./pages/Connection";
import Artist from "./components/Artist";
import Friends from "./components/Friends";
import { useAuth } from "./contexts/AuthContext";
import "./App.scss";
import InfoStreetArt from "./components/InfoStreetArt";
import InfoAdminStreetArt from "./components/InfoAdminStreetArt";

function App() {
  const { token, role } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        {token != null && (
          <>
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
              path="/gallery/:id/:longitude/:latitude"
              element={
                <GameBoyScreen returnLink="/gallery">
                  <InfoStreetArt />
                </GameBoyScreen>
              }
            />
            <Route
              path="/gallery/artists/:id"
              element={
                <GameBoyScreen returnLink="/gallery">
                  <Artist />
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
              path="/street-arts/:id/:longitude/:latitude"
              element={
                <GameBoyScreen returnLink="/street-arts">
                  <InfoAdminStreetArt />
                </GameBoyScreen>
              }
            />
            <Route
              path="/street-arts/artists/:id"
              element={
                <GameBoyScreen returnLink="/street-arts">
                  <Artist />
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
            <Route
              path="/friends"
              element={
                <GameBoyScreen>
                  <Friends />
                </GameBoyScreen>
              }
            />

            {role && (
              <Route
                path="/street-arts"
                element={
                  <GameBoyScreen>
                    <StreetArtsList />
                  </GameBoyScreen>
                }
              />
            )}
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
