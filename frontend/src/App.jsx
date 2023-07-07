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
import { useAuth } from "./contexts/AuthContext";
import "./App.scss";

import Message from "./components/Message";

function App() {
  const { token, role } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        {token != null && (
          <>
            <Route path="/message" element={<Message />} />
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
            <Route
              path="/artists/:id"
              element={
                <GameBoyScreen>
                  <Artist />
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
