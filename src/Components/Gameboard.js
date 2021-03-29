import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import {
  Container,
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
import { compareToAnswer, createSolution } from "../Common/utils";
import { SOLUTION_LENGTH } from "../Common/constants";
const initialState = {
  selectedColors: [],
  guesses: [],
  answerCodes: [],
  solution: [],
  solved: false,
};

const actions = {
  SELECT_COLOR: "SELECT_COLOR",
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function gameReducer(state, action) {
  switch (action.type) {
    case actions.SELECT_COLOR:
      const newColors = [...state.selectedColors, action.value];
      return state.selectedColors.length < SOLUTION_LENGTH
        ? { ...state, selectedColors: newColors }
        : state;
    case actions.SUBMIT_GUESS:
      const answerCode = compareToAnswer(action.value, state.solution);
      const newAnswerCodes = [...state.answerCodes, answerCode];
      const solved =
        _.indexOf(answerCode, "white") < 0 && answerCode.length === 4;
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
    case actions.RESET_SOLVED:
      return { ...state, solved: false };
    case actions.CREATE_SOLUTION:
      return { ...state, solution: createSolution() };
    case actions.RESTART:
      return {
        ...state,
        ...initialState,
        solution: createSolution(),
        solved: false,
      };
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
    guesses: state.guesses,
    answerCodes: state.answerCodes,
    solution: state.solution,
    solved: state.solved,
    selectColor: (value) => dispatch({ type: actions.SELECT_COLOR, value }),
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
    resetSelectColors,
    resetSolved,
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
      createSolution();
    }
  });

  const [expandAccordion, setExpandAccordion] = useState(false);
  const [newGame, setNewGame] = useState(false);

  return (
    <Container className="main-container">
      <Grid className="gameboard" container spacing={3}>
        <Grid item xs={9}>
          <Card style={{ margin: "1em 0 1em 0", background: "lightgrey" }}>
            <CardContent>
              <h3>GUESSES:</h3>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={2}>
                  {answerCodes.map((code, idx) => (
                    <DisplayCode
                      key={`code-${idx}`}
                      name={`code-${idx}`}
                      colors={code}
                    />
                  ))}
                </Grid>
                <Grid item xs={4}>
                  {guesses.map((i, idx) => (
                    <DisplayRow
                      key={`row-${idx}`}
                      name={`row-${idx}`}
                      colors={i}
                    />
                  ))}
                </Grid>
              </Grid>
              <Dialog
                open={solved}
                TransitionComponent={Transition}
                keepMounted
                onClose={resetSolved}
              >
                <DialogTitle id="alert-dialog-slide-title">
                  You Won!
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    {`It took you ${guesses.length} guesses to win`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setNewGame(true);
                      resetSolved();
                    }}
                    color="primary"
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ margin: "1em 0 1em 0" }}>
            <h3>PEG OPTIONS</h3>
            <PegChoices numColumns={3} />
            <hr />
            <h3>SELECTION:</h3>
            <DisplayRow
              className="selection"
              name={`selection`}
              colors={selectedColors}
            />
            <hr />
            <div className={classes.root}>
              {!newGame ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => resetSelectColors()}
                  >
                    Clear
                  </Button>

                  <Button
                    variant="contained"
                    disabled={selectedColors.length != SOLUTION_LENGTH}
                    onClick={() => submitGuess(selectedColors)}
                  >
                    Submit
                  </Button>
                </>
              ) : (
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
              )}
            </div>
          </Card>

          <Accordion
            expanded={expandAccordion}
            onClick={() => setExpandAccordion(!expandAccordion)}
          >
            <AccordionSummary
              className={classes.accordion}
              expandIcon={<ExpandMoreIcon />}
            >
              <h4>Show Answer</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  <h3>Cheater!</h3>
                </Grid>
                <Grid item xs={12}>
                  <DisplayRow
                    className="selection"
                    name={`solution`}
                    colors={solution}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
}
