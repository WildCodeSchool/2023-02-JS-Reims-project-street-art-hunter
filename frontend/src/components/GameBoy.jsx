import PropTypes from "prop-types";

export default function GameBoy({
  children,
  upController,
  buttonLabelup,
  downController,
  buttonLabeldown,
  leftController,
  rightController,
  button1Controller,
  button2Controller,
  buttonLabel1,
  buttonLabel2,
  ButtonColor1,
  ButtonColor2,
  gameBoyColor,
}) {
  return (
    <div
      className="gameBoy"
      style={{ backgroundColor: `hsl(${gameBoyColor}, 10%, 82%)` }}
    >
      <div className="display">
        {children}
        <p className="title">Street Art Hunter</p>
      </div>
      <div className="controller">
        <button type="button" className="up" onClick={upController}>
          {" "}
        </button>
        <button type="button" className="down" onClick={downController}>
          {" "}
        </button>
        <button type="button" className="left" onClick={leftController}>
          {" "}
        </button>
        <button type="button" className="right" onClick={rightController}>
          {" "}
        </button>
        {buttonLabelup && <label className="labelup">{buttonLabelup}</label>}
        {buttonLabeldown && (
          <label className="labeldown">{buttonLabeldown}</label>
        )}
      </div>
      <div className="buttonController">
        <label htmlFor="button1" className="label1">
          {buttonLabel1}
        </label>
        <label htmlFor="button2" className="label2">
          {buttonLabel2}
        </label>
        <button
          type="button"
          className={`button1 ${ButtonColor1}`}
          name="button1"
          onClick={button1Controller}
        >
          {" "}
        </button>
        <button
          type="button"
          className={`button2 ${ButtonColor2}`}
          name="button2"
          onClick={button2Controller}
        >
          {" "}
        </button>
      </div>
    </div>
  );
}

GameBoy.propTypes = {
  children: PropTypes.node.isRequired,
  upController: PropTypes.func,
  downController: PropTypes.func,
  leftController: PropTypes.func,
  rightController: PropTypes.func,
  button1Controller: PropTypes.func,
  button2Controller: PropTypes.func,
  buttonLabel1: PropTypes.string,
  buttonLabel2: PropTypes.string,
  buttonLabelup: PropTypes.string,
  buttonLabeldown: PropTypes.string,
  ButtonColor1: PropTypes.string,
  ButtonColor2: PropTypes.string,
  gameBoyColor: PropTypes.string,
};

GameBoy.defaultProps = {
  upController: () => {},
  downController: () => {},
  leftController: () => {},
  rightController: () => {},
  button1Controller: () => {},
  button2Controller: () => {},
  buttonLabelup: "",
  buttonLabeldown: "",
  buttonLabel1: "",
  buttonLabel2: "",
  ButtonColor1: "red",
  ButtonColor2: "red",
  gameBoyColor: parseInt(localStorage.getItem("gameBoyColor"), 10),
};
