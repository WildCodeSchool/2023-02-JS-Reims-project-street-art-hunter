import PropTypes from "prop-types";

export default function GameBoy({
  children,
  upController,
  downController,
  leftController,
  rightController,
  buton1Controller,
  buton2Controller,
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
        <button type="button" className="button1" onClick={buton1Controller}>
          {" "}
        </button>
        <button type="button" className="button2" onClick={buton2Controller}>
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
  buton1Controller: PropTypes.func.isRequired,
  buton2Controller: PropTypes.func.isRequired,
};
