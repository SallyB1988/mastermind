import React, { useContext, useState } from "react";
import { Grid, Button, Menu, MenuItem, Modal } from "@material-ui/core";
import { GameContext } from "./Gameboard";
import { makeStyles } from "@material-ui/core/styles";
import { Translate } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function GameInfo() {
  const classes = useStyles();

  const { numPuzzlePegs, setNumPuzzlePegs, restart } = useContext(GameContext);

  const [instructionModal, setInstructionModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectionMenu, setSelectionMenu] = React.useState(false);

  const handleSetDifficulty = (event) => {
    setSelectionMenu(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSetDifficulty = () => {
    restart();
    setAnchorEl(null);
  };

  const handleSelection = (val) => {
    setSelectionMenu(false);
    setNumPuzzlePegs(val);
    restart();
  };

  return (
    <Grid className="gameInfo" xs={12}>
      <Button
        className="button"
        variant="contained"
        onClick={() => setInstructionModal(!instructionModal)}
      >
        Instructions
      </Button>
      <Button
        className="infobutton"
        id="selectDifficulty"
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleSetDifficulty}
      >
        Select # of Pegs
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={selectionMenu}
        onClose={handleCloseSetDifficulty}
      >
        <MenuItem onClick={() => handleSelection(4)}>4</MenuItem>
        <MenuItem onClick={() => handleSelection(5)}>5</MenuItem>
        <MenuItem onClick={() => handleSelection(6)}>6</MenuItem>
      </Menu>
      <Modal
        className="modal"
        open={instructionModal}
        onClose={() => setInstructionModal(false)}
      >
        <body className={classes.paper}>
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
        </body>
      </Modal>
    </Grid>
  );
}
