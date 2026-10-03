function Dice3D() {
  return (
    <div className="dice-scene">
      <div className="dice-shadow" />

      <div className="dice-3d">
        <div className="dice-face dice-front">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="dice-face dice-back">
          <span />
        </div>

        <div className="dice-face dice-right">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="dice-face dice-left">
          <span />
          <span />
        </div>

        <div className="dice-face dice-top">
          <span />
          <span />
          <span />
        </div>

        <div className="dice-face dice-bottom">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default Dice3D;
