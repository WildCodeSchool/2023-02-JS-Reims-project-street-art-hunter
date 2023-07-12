import PropTypes from "prop-types";

function Valide({ setValide }) {
  return (
    <div className="popup">
      <p>Valide</p>
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

function NewStreetArt() {
  return (
    <div className="popup">
      <p>NewStreetArt</p>
      <div className="popupButton">
        <button type="button">Ok</button>
      </div>
    </div>
  );
}

export { Valide, NewStreetArt };
