import React, { useContext } from "react";
import { GameContext } from "./Gameboard";
import { Icon } from "semantic-ui-react";

const Peg = ({ color, size = 30 }) => {
  const { selectColor } = useContext(GameContext);

  return (
    <Icon
      name="circle"
      style={{ color: color, fontSize: size }}
      onClick={() => selectColor(color)}
    />
  );
};

export default Peg;
