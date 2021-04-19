import React, { useContext, useState } from "react";
import { Grid, Button, Menu, Modal, Dropdown } from "semantic-ui-react";
import { GameContext } from "./Gameboard";

export default function GameInfo() {
  const {
    numPuzzlePegs,
    setNumPuzzlePegs,
    numColorsToUse,
    setNumColorsToUse,
    restart,
  } = useContext(GameContext);

  const [instructionModal, setInstructionModal] = useState(false);

  const numPegOptions = [
    { key: 1, text: "3 Pegs", value: 3 },
    { key: 2, text: "4 Pegs", value: 4 },
    { key: 3, text: "5 Pegs", value: 5 },
  ];

  const numColorOptions = [
    { key: 1, text: "4 Colors", value: 4 },
    { key: 2, text: "5 Colors", value: 5 },
    { key: 3, text: "6 Colors", value: 6 },
    { key: 3, text: "7 Colors", value: 7 },
    { key: 3, text: "8 Colors", value: 8 },
  ];

  const handlePegChange = (e, data) => {
    setNumPuzzlePegs(data.value);
    restart();
  };

  const handleColorChange = (e, data) => {
    setNumColorsToUse(data.value);
    restart();
  };

  return (
    <Grid>
      <Grid.Row columns={3}>
        <Grid.Column floated="left">
          <Button
            className="button"
            variant="contained"
            onClick={() => setInstructionModal(!instructionModal)}
          >
            Instructions
          </Button>
        </Grid.Column>
        <Grid.Column floated="middle">
          <Menu compact className="menu">
            <Dropdown
              text={`${numPuzzlePegs} Pegs`}
              options={numPegOptions}
              simple
              item
              onChange={handlePegChange}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column floated="right">
          <Menu compact className="menu">
            <Dropdown
              text={`${numColorsToUse} Colors`}
              options={numColorOptions}
              simple
              item
              onChange={handleColorChange}
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
          <h2>This game is based off the Mastermind game by Pressman.</h2>
          <h3>Goal:</h3>
          <h4>
            The computer has created a code for you to crack! Try to guess the
            random color code by guessing combinations of colored pegs from the
            peg options. Colors may be used more than once.
            <br />
            When a guess is entered, the computer responds with a code:
            <ul>
              <li>
                <b>white: </b>means a peg is the correct color but <b>wrong</b>{" "}
                position
              </li>
              <li>
                <b>black: </b>means a peg is the correct color and{" "}
                <b>correct</b> position
              </li>
            </ul>
            <br />
            You get 10 tries to guess the code.
            <br />
            NOTE: The response pegs do NOT correspond to any particular column
            in the guessed section.
          </h4>
        </Modal.Content>
      </Modal>
    </Grid>
  );
}
