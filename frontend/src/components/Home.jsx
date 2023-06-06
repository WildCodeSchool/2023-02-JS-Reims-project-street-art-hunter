import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="home">
      <img src={logo} alt="" />
      <Link to="/menu">
        <button type="button" className="return">
          Start
        </button>
      </Link>
    </div>
  );
}
