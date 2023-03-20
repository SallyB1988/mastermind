import React, { useContext } from "react";
import { GameContext } from "./Gameboard";
import { Icon } from "semantic-ui-react";

// adding a comment
const Peg = ({ color, size = 30 }) => {
  const { selectColor } = useContext(GameContext);

  return (
    <Icon
      name="circle"
      style={{ color: color }}
      size="large"
      onClick={() => selectColor(color)}
    />
  );
};

export default Peg;
