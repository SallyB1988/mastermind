import React from "react";
import { Icon } from "semantic-ui-react";
// Display key code in two rows
export default function DisplayCode(props) {
  const { colors, name } = props;
  const firstRow = colors.slice(0, colors.length / 2);
  const secondRow = colors.slice(firstRow.length);
  return (
    <div className="keyRow">
      <div className="displayKeyRow">
        {firstRow.map((c, idx) => (
          <Icon
            name="circle"
            key={`guess-${name}-${idx}`}
            size="small"
            style={{ color: c }}
          />
        ))}
      </div>
      <div className="displayKeyRow">
        {secondRow.map((c, idx) => (
          <Icon
            name="circle"
            key={`guess-${name}-${idx}`}
            size="small"
            style={{ color: c }}
          />
        ))}
      </div>
    </div>
  );
}
