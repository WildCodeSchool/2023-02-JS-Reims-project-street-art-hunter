// Module
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
// GameBoy style
import GameBoyScreen from "./components/GameBoyScreen";
// Page User
import Connection from "./pages/Connection";
import Home from "./components/Home";
import Menu from "./components/Menu";
import GameBoyColor from "./components/GameBoyColor";
import Camera from "./components/Camera";
import Score from "./components/Score";
import Gallery from "./components/Gallery";
import Artist from "./components/Artist";
// Page Admin
import StreetArtsList from "./components/StreetArtsList";
// SASS
import "./App.scss";

import Message from "./components/Message";

function App() {
  const { token } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<Message />} />
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
            <Route
              path="/artists/:id"
              element={
                <GameBoyScreen>
                  <Artist />
                </GameBoyScreen>
              }
            />
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
