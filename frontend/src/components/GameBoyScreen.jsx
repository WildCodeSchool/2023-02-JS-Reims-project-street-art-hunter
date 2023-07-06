import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { GiReturnArrow } from "react-icons/gi";
import { useAuth } from "../contexts/AuthContext";

export default function GameBoyScreen({ children }) {
  const { gameBoyColor } = useAuth();
  return (
    <div className="gameBoyScreen">
      <div className="Screen">{children}</div>
      <p className="title">
        Street Art Hunter
        <Link to="/menu">
          <button type="button" className="return">
            <GiReturnArrow
              size="2rem"
              style={
                Number.isNaN(gameBoyColor)
                  ? { color: `#FFF` }
                  : { color: `hsl(${gameBoyColor}, 100%, 50%)` }
              }
            />
          </button>
        </Link>
      </p>
    </div>
  );
}

GameBoyScreen.propTypes = {
  children: PropTypes.node.isRequired,
};
