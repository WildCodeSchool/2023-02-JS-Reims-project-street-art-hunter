import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Return from "../assets/return.png";

export default function GameBoyScreen({ children, returnLink }) {
  return (
    <div className="gameBoyScreen">
      <div className="Screen">{children}</div>
      <p className="title">
        Street Art Hunter
        <Link to={returnLink}>
          <button type="button" className="return">
            <img src={Return} alt="return" />
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
