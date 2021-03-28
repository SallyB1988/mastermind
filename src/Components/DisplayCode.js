import React, { Fragment } from "react";
import _ from "lodash";
import Brightness1Icon from "@material-ui/icons/Brightness1";

export default function DisplayCode(props) {
  const { colors, name, size = 20 } = props;
  return (
    <div className="displayTableRow">
      {colors.map((c, idx) => (
        <Brightness1Icon
          key={`guess-${name}-${idx}`}
          style={{ color: c, fontSize: size }}
        />
      ))}
    </div>
  );
}
