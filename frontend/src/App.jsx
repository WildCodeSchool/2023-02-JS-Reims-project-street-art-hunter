import Home from "./pages/Home";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <div className="display" />
      <div className="controleur">
        <button type="button" className="up">
          {" "}
        </button>
        <button type="button" className="down">
          {" "}
        </button>
        <button type="button" className="left">
          {" "}
        </button>
        <button type="button" className="right">
          {" "}
        </button>
      </div>
      <div className="buttonControleur">
        <button type="button" className="button1">
          {" "}
        </button>
        <button type="button" className="button2">
          {" "}
        </button>
      </div>
    </div>
  );
}

export default App;
