import React from "react";
import { Icon } from "semantic-ui-react";

export default function DisplayRow(props) {
  const { colors, name } = props;
  return (
    <div className="displayTableRow">
      {colors.map((c, idx) => (
        <Icon
          name="circle"
          key={`guess-${name}-${idx}`}
          style={{ color: c }}
          size="large"
        />
      ))}
    </div>
  );
}
