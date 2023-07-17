import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { GiReturnArrow } from "react-icons/gi";
import { useAuth } from "../contexts/AuthContext";

export default function GameBoyScreen({ children, returnLink }) {
  const { gameBoyColor } = useAuth();
  return (
    <div className="gameBoyScreen">
      <div className="Screen">{children}</div>
      <p className="title">
        Street Art Hunter
        <Link to={returnLink}>
          <button type="button" className="return">
            <GiReturnArrow
              size="2rem"
              style={
                Number.isNaN(gameBoyColor)
                  ? { color: `#FFF` }
                  : { color: `hsl(${gameBoyColor}, 50%, 50%)` }
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
  returnLink: PropTypes.string,
};

GameBoyScreen.defaultProps = {
  returnLink: "/menu",
};
