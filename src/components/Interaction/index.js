import React, { useState } from "react";
import "./Interaction.css";

const Interaction = () => {
  const [varAValue, setVarAValue] = useState(50);
  const [varBValue, setVarBValue] = useState(50);
  const handleVarAChange = (event) => {
      setVarAValue(event.target.value);
    };
    const handleVarBChange = (event) => {
        setVarBValue(event.target.value);
    };

    let totalValue = Number(varAValue) + Number(varBValue);

  return (
    <div className="interaction-section">
      <h1 className="section-title" id="interaction-title">
        Interaction
      </h1>
      <p>Variable A: {varAValue}</p>
      <input
        type="range"
        min="1"
        max="100"
        className="var-a"
        value={varAValue}
        onChange={handleVarAChange}
      />
      <p>Variable B: {varBValue}</p>

      <input
        type="range"
        min="1"
        max="100"
        className="var-b"
        value={varBValue}
        onChange={handleVarBChange}
      />
      <p>Variable A + Variable B: {totalValue}</p>
    </div>
  );
};

export default Interaction;
