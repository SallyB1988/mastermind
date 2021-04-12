import React from "react";
import { Icon } from "semantic-ui-react";

export default function DisplayRow(props) {
  const { colors, name, size = 40 } = props;
  return (
    <div className="displayTableRow">
      {colors.map((c, idx) => (
        <Icon
          name="circle"
          key={`guess-${name}-${idx}`}
          style={{ color: c, fontSize: size }}
        />
      ))}
    </div>
  );
}
