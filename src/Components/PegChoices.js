import React, { useContext } from "react";
import { GameContext } from "./Gameboard";
import { Grid } from "@material-ui/core";

import Peg from "../Components/Peg";

function PegChoices(props) {
  const { colorsToUse } = useContext(GameContext);

  return (
    <Grid container justify="center">
      {colorsToUse.map((c, idx) => {
        return <Peg key={`peg-${idx}`} color={c} />;
      })}
    </Grid>
  );
}

export default PegChoices;
