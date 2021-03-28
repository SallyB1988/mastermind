import React from "react";
import { Grid } from "@material-ui/core";

import Peg from "../Components/Peg";
import { COLOR_CHOICES } from "../Common/constants";

function PegChoices(props) {
  const { numColumnss } = props;
  const width = Math.floor(12 / numColumnss);

  return (
    <Grid container justify="center">
      {COLOR_CHOICES.map((c, idx) => {
        return <Peg key={`peg-${idx}`} color={c} />;
      })}
    </Grid>
  );
}

export default PegChoices;
