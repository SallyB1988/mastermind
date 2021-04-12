import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import { Grid, Button, Accordion, Icon, Image } from "semantic-ui-react";

import _ from "lodash";
import PegChoices from "./PegChoices";
import DisplayRow from "./DisplayRow";
import DisplayCode from "./DisplayCode";
import GameInfo from "./GameInfo";
import { compareToAnswer, createSolution } from "../Common/utils";
import HeaderImage from "../images";
import { COLOR_SET } from "../Common/constants";
import YouWonModal from "./YouWonModal";

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

  return (
    <Grid container celled>
      <Grid.Row>
        <Grid.Column width={8}>
          <Image src={HeaderImage} alt={"Mastermind"} />
          <GameInfo />
          <YouWonModal />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={10}>
          <Grid container>
            {_.map(answerCodes, (code, idx) => (
              <Grid.Row>
                <Grid.Column className="border" width={4}>
                  <DisplayCode
                    key={`code-${idx}`}
                    name={`code-${idx}`}
                    colors={code}
                  />
                </Grid.Column>
                <Grid.Column width={10}>
                  <DisplayRow
                    key={`row-${idx}`}
                    name={`row-${idx}`}
                    colors={guesses[idx]}
                  />
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Row className="pegCard">
            <h3>PEG OPTIONS</h3>
            <PegChoices numColumns={3} />
            <hr />
            <h3>SELECTION:</h3>
            <DisplayRow name={`selection`} colors={selectedColors} />
            <hr />
            <div>
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
          </Grid.Row>
          <Grid.Row>
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
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
