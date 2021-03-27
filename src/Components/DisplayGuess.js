import React, { Fragment } from "react";
import _ from "lodash";
import Brightness1Icon from "@material-ui/icons/Brightness1";

export default function DisplayGuess(props) {
  const { colors, name, size = 40 } = props;
  return (
    <Fragment>
      {colors.map((c, idx) => (
        <Brightness1Icon
          key={`guess-${name}-${idx}`}
          style={{ color: c, fontSize: size }}
        />
      ))}
    </Fragment>
  );
}
