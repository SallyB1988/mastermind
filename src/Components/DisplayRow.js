import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";

export default function DisplayRow(props) {
  const { colors, name, size = 40 } = props;
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
