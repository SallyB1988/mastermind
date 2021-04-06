import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import {
  Grid,
  Card,
  Button,
  CardContent,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import _ from "lodash";
import PegChoices from "./PegChoices";
import DisplayRow from "./DisplayRow";
import DisplayCode from "./DisplayCode";
import GameInfo from "./GameInfo";
import { compareToAnswer, createSolution } from "../Common/utils";
import HeaderImage from "../images";
import { COLOR_SET } from "../Common/constants";

const initialState = {
  numPuzzlePegs: 4,
  colorsToUse: [],
  selectedColors: [],
  guesses: [],
  answerCodes: [],
  solution: [],
  solved: false,
};

const actions = {
  SELECT_COLOR: "SELECT_COLOR",
  SET_NUM_PUZZLE_PEGS: "SET_NUM_PUZZLE_PEGS",
  SET_COLORS_TO_USE: "SET_COLORS_TO_USE",
  SUBMIT_GUESS: "SUBMIT_GUESS",
  RESET_SELECTED_COLORS: "RESET_SELECTED_COLORS",
  RESET_SOLVED: "RESET_SOLVED",
  CREATE_SOLUTION: "CREATE_SOLUTION",
  RESTART: "RESTART",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  accordion: {
    marginTop: "0px",
    marginBottom: "0px",
    height: "50px",
  },
  header: {
    height: "300px",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function gameReducer(state, action) {
  const colorSet = state.colorsToUse;
  const numPegs = state.numPuzzlePegs;

  switch (action.type) {
    case actions.SELECT_COLOR:
      const newColors = [...state.selectedColors, action.value];
      return state.selectedColors.length < numPegs
        ? { ...state, selectedColors: newColors }
        : state;
    case actions.SUBMIT_GUESS:
      const answerCode = compareToAnswer(action.value, state.solution);
      const newAnswerCodes = [...state.answerCodes, answerCode];
      const solved =
        _.indexOf(answerCode, "white") < 0 &&
        answerCode.length === state.numPuzzlePegs;
      const newGuesses = [...state.guesses, action.value];
      return {
        ...state,
        guesses: newGuesses,
        answerCodes: newAnswerCodes,
        selectedColors: [],
        solved: solved,
      };
    case actions.RESET_SELECTED_COLORS:
      return { ...state, selectedColors: [] };
    // case actions.RESET_SOLVED:
    //   return { ...state, solved: false };
    case actions.CREATE_SOLUTION:
      return { ...state, solution: createSolution(numPegs, colorSet) };
    case actions.RESTART:
      return {
        ...state,
        ...initialState,
        numPuzzlePegs: numPegs,
        colorsToUse: COLOR_SET.slice(0, numPegs),
        solution: createSolution(numPegs, colorSet),
        solved: false,
      };
    case actions.SET_NUM_PUZZLE_PEGS:
      return { ...state, numPuzzlePegs: action.value };
    case actions.SET_COLORS_TO_USE:
      return { ...state, colorsToUse: action.value };
    default:
      return state;
  }
}

export default function GameBoard() {
  return (
    <Provider>
      <Board />
    </Provider>
  );
}

export const GameContext = createContext();

function Provider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const value = {
    selectedColors: state.selectedColors,
    colorsToUse: state.colorsToUse,
    numPuzzlePegs: state.numPuzzlePegs,
    guesses: state.guesses,
    answerCodes: state.answerCodes,
    solution: state.solution,
    solved: state.solved,
    selectColor: (value) => dispatch({ type: actions.SELECT_COLOR, value }),
    setNumPuzzlePegs: (value) =>
      dispatch({ type: actions.SET_NUM_PUZZLE_PEGS, value }),
    setColorsToUse: (value) =>
      dispatch({ type: actions.SET_COLORS_TO_USE, value }),
    submitGuess: (value) => dispatch({ type: actions.SUBMIT_GUESS, value }),
    resetSelectColors: () => dispatch({ type: actions.RESET_SELECTED_COLORS }),
    resetSolved: () => dispatch({ type: actions.RESET_SOLVED }),
    createSolution: () => dispatch({ type: actions.CREATE_SOLUTION }),
    restart: () => dispatch({ type: actions.RESTART }),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function Board() {
  const classes = useStyles();

  const {
    selectedColors,
    colorsToUse,
    numPuzzlePegs,
    resetSelectColors,
    resetSolved,
    setColorsToUse,
    submitGuess,
    createSolution,
    restart,
    guesses,
    answerCodes,
    solution,
    solved,
  } = useContext(GameContext);

  useEffect(() => {
    console.log(solution);
    if (solution.length === 0) {
      setColorsToUse(COLOR_SET.slice(0, numPuzzlePegs));
      createSolution(numPuzzlePegs, colorsToUse);
    }
  });

  const [expandAccordion, setExpandAccordion] = useState(false);
  const [newGame, setNewGame] = useState(false);

  return (
    <Grid
      className="gameboard"
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid item xs={12} centered>
        <div>
          <img className="header" src={HeaderImage} alt={"Mastermind"} />
        </div>
        <GameInfo />
      </Grid>
      <Grid item xs={6}>
        {/* <Card className="boardCard"> */}
        <Card style={{ margin: "1em 0 1em 0", background: "lightgrey" }}>
          <Grid container justify="center">
            <Grid className="border" item xs={4}>
              {answerCodes.map((code, idx) => (
                <DisplayCode
                  key={`code-${idx}`}
                  name={`code-${idx}`}
                  colors={code}
                />
              ))}
            </Grid>
            <Grid item xs={8}>
              {guesses.map((i, idx) => (
                <DisplayRow key={`row-${idx}`} name={`row-${idx}`} colors={i} />
              ))}
            </Grid>
          </Grid>
          {/* </Card> */}
          <Dialog
            open={solved}
            TransitionComponent={Transition}
            keepMounted
            onClose={resetSolved}
          >
            <DialogTitle id="alert-dialog-slide-title">You Won!</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {`It took you ${guesses.length} guesses to win`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setNewGame(true);
                  restart();
                }}
                color="primary"
              >
                Restart
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className="pegCard">
          <h3>PEG OPTIONS</h3>
          <PegChoices numColumns={3} />
          <hr />
          <h3>SELECTION:</h3>
          <DisplayRow name={`selection`} colors={selectedColors} />
          <hr />
          <div className={classes.root}>
            <>
              <Button variant="contained" onClick={() => resetSelectColors()}>
                Clear
              </Button>

              <Button
                variant="contained"
                disabled={selectedColors.length !== numPuzzlePegs}
                onClick={() => submitGuess(selectedColors)}
              >
                Submit
              </Button>
            </>
          </div>
        </Card>

        <Accordion
          className="showAnswer"
          expanded={expandAccordion}
          onClick={() => setExpandAccordion(!expandAccordion)}
        >
          <AccordionSummary
            className={classes.accordion}
            expandIcon={<ExpandMoreIcon />}
          >
            <h4>Give up</h4>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                <h3>Solution</h3>
              </Grid>
              <Grid item xs={12}>
                <DisplayRow
                  className="selection"
                  name={`solution`}
                  colors={solution}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setExpandAccordion(false);
                    setNewGame(false);
                    setTimeout(restart, 500);
                  }}
                >
                  Restart game
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
