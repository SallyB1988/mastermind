import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";

// Display key code in two rows
export default function DisplayCode(props) {
  const { colors, name, size = 15 } = props;
  const firstRow = colors.slice(0, colors.length / 2);
  const secondRow = colors.slice(firstRow.length);
  return (
    <div className="keyRow">
      <div className="displayKeyRow">
        {firstRow.map((c, idx) => (
          <Brightness1Icon
            key={`guess-${name}-${idx}`}
            style={{ color: c, fontSize: size }}
          />
        ))}
      </div>
      <div className="displayKeyRow">
        {secondRow.map((c, idx) => (
          <Brightness1Icon
            key={`guess-${name}-${idx}`}
            style={{ color: c, fontSize: size }}
          />
        ))}
      </div>
    </div>
  );
}
