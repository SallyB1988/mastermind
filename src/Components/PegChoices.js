import React from "react";
import { Grid } from "@material-ui/core";

import Peg from "../Components/Peg";

const colorChoices = ["yellow", "red", "blue", "green"];

function PegChoices(props) {
  const { numCols } = props;
  const width = Math.floor(12 / numCols);

  return (
    <Grid container justify="center">
      {colorChoices.map((c, idx) => {
        return <Peg key={`peg-${idx}`} color={c} />;
      })}
    </Grid>
  );
}

export default PegChoices;
