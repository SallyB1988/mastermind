import React, { useContext, useState } from "react";
import { Grid, Button, Menu, Modal, Dropdown } from "semantic-ui-react";
import { GameContext } from "./Gameboard";

export default function GameInfo() {
  const { numPuzzlePegs, setNumPuzzlePegs, restart } = useContext(GameContext);

  const [instructionModal, setInstructionModal] = useState(false);

  const options = [
    { key: 1, text: "3 Colors", value: 3 },
    { key: 2, text: "4 Colors", value: 4 },
    { key: 3, text: "5 Colors", value: 5 },
  ];

  const handleChange = (e, data) => {
    setNumPuzzlePegs(data.value);
    restart();
  };

  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column floated="left">
          <Button
            className="button"
            variant="contained"
            onClick={() => setInstructionModal(!instructionModal)}
          >
            Instructions
          </Button>
        </Grid.Column>
        <Grid.Column floated="right">
          <Menu compact className="menu">
            <Dropdown
              text={`${numPuzzlePegs} Colors`}
              options={options}
              simple
              item
              onChange={handleChange}
            />
          </Menu>
        </Grid.Column>
      </Grid.Row>

      <Modal
        className="modal"
        open={instructionModal}
        onClose={() => setInstructionModal(false)}
      >
        <Modal.Content>
          <h3>Goal:</h3>
          <p>
            The computer has created a code for you to crack! Try to guess the
            random color code by entering selected color pegs and analyzing the
            response shown in the response column.
          </p>
          <ul>
            <li>
              When four colors are used, you get 10 chances to find the
              solution. If you choose to use more colors, you get unlimited
              guesses.
            </li>
            <li>
              A white peg means you have a correct color, but in the wrong
              place.
            </li>
            <li>
              A black peg means you have the correct color in the correct place.{" "}
            </li>
            <li>
              To make the game more challenging, you may change the number of
              pegs selected by the computer. But, it becomes painful when 6
              colors are used!
            </li>
          </ul>
          <p>
            NOTE: The response pegs do NOT correspond to any particular column
            in the guessed section.
          </p>
        </Modal.Content>
      </Modal>
    </Grid>
  );
}
