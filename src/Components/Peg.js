import React, { useContext } from "react";
import { GameContext } from "./Gameboard";
import Brightness1Icon from "@material-ui/icons/Brightness1";

const Peg = ({ color, size = 40 }) => {
  const { selectColor } = useContext(GameContext);

  return (
    <Brightness1Icon
      style={{ color: color, fontSize: size }}
      onClick={() => selectColor(color)}
    />
  );
};

export default Peg;
