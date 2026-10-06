function Dice3D() {
  const Pip = ({ position }) => (
    <span className={`dice-pip dice-pip-${position}`} />
  );

  const Face = ({ className, number }) => {
    const positions = {
      1: ["center"],
      2: ["top-left", "bottom-right"],
      3: ["top-left", "center", "bottom-right"],
      4: ["top-left", "top-right", "bottom-left", "bottom-right"],
      5: [
        "top-left",
        "top-right",
        "center",
        "bottom-left",
        "bottom-right",
      ],
      6: [
        "top-left",
        "top-right",
        "middle-left",
        "middle-right",
        "bottom-left",
        "bottom-right",
      ],
    };

    return (
      <div className={`dice-cube-face ${className}`}>
        {positions[number].map((position) => (
          <Pip key={position} position={position} />
        ))}
      </div>
    );
  };

  return (
    <div className="real-dice-scene">
      <div className="real-dice-shadow" />

      <div className="real-dice">
        <Face className="dice-cube-front" number={5} />
        <Face className="dice-cube-back" number={2} />
        <Face className="dice-cube-right" number={6} />
        <Face className="dice-cube-left" number={1} />
        <Face className="dice-cube-top" number={3} />
        <Face className="dice-cube-bottom" number={4} />
      </div>
    </div>
  );
}

export default Dice3D;