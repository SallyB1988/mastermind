import React, { useContext, useState } from "react";
import { Button, Accordion, Icon } from "semantic-ui-react";
import { GameContext } from "./Gameboard";

import DisplayRow from "./DisplayRow";

export default function GiveUp() {
  const { restart, solution } = useContext(GameContext);

  const [expandAccordion, setExpandAccordion] = useState(false);

  return (
    <Accordion className="showAnswer">
      <Accordion.Title
        active={expandAccordion}
        onClick={() => setExpandAccordion(!expandAccordion)}
      >
        <h4>Give up</h4>
        <Icon name="dropdown" />
      </Accordion.Title>
      <Accordion.Content active={expandAccordion}>
        <div>
          <h3>Solution</h3>
          <DisplayRow
            className="selection"
            name={`solution`}
            colors={solution}
          />
          <Button
            variant="contained"
            onClick={() => {
              setExpandAccordion(false);
              setTimeout(restart, 500);
            }}
          >
            Restart game
          </Button>
        </div>
      </Accordion.Content>
    </Accordion>
  );
}
