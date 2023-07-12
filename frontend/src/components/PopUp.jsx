import PropTypes from "prop-types";

import { FcApproval } from "react-icons/fc";

function Valide({ setValide }) {
  return (
    <div className="popup">
      <section>
        <h1>
          Valide <FcApproval />
        </h1>
        <p>un admin va voir</p>
      </section>
      <div className="popupButton">
        <button type="button" onClick={() => setValide(false)}>
          Ok
        </button>
      </div>
    </div>
  );
}
Valide.propTypes = {
  setValide: PropTypes.func.isRequired,
};

function NewStreetArt({ setNewStreetArt, NewArt }) {
  return (
    <div className="popup">
      <div>
        <h1>Street Art non trouver</h1>
      </div>
      <div className="popupButton">
        <button type="button" onClick={NewArt}>
          Nouveaux Street Art?
        </button>
        <button type="button" onClick={() => setNewStreetArt(false)}>
          Ok
        </button>
      </div>
    </div>
  );
}
NewStreetArt.propTypes = {
  setNewStreetArt: PropTypes.func.isRequired,
  NewArt: PropTypes.func.isRequired,
};

function Posseder({ setPosseder }) {
  return (
    <div className="popup">
      <section>
        <h1>Posséder</h1>
        <p>vous possédez deja ce street art</p>
      </section>
      <div className="popupButton">
        <button type="button" onClick={() => setPosseder(false)}>
          Ok
        </button>
      </div>
    </div>
  );
}
Posseder.propTypes = {
  setPosseder: PropTypes.func.isRequired,
};

export { Valide, NewStreetArt, Posseder };
