import PropTypes from "prop-types";

export default function GameBoy({
  children,
  upController,
  downController,
  leftController,
  rightController,
  button1Controller,
  button2Controller,
  buttonLabel1,
  buttonLabel2,
}) {
  return (
    <div className="gameBoy">
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
          className="button1"
          name="button1"
          onClick={button1Controller}
        >
          {" "}
        </button>
        <button
          type="button"
          className="button2"
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
  upController: PropTypes.func.isRequired,
  downController: PropTypes.func.isRequired,
  leftController: PropTypes.func.isRequired,
  rightController: PropTypes.func.isRequired,
  button1Controller: PropTypes.func.isRequired,
  button2Controller: PropTypes.func.isRequired,
  buttonLabel1: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
};
