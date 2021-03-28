import React, { createContext, useContext, useReducer } from "react";
import { Container, Grid, Card, Button, CardContent } from "@material-ui/core";
import _ from "lodash";
import PegChoices from "./PegChoices";
import DisplayRow from "./DisplayRow";
import DisplayCode from "./DisplayCode";
import { compareToAnswer } from "../Common/utils";
const initialState = {
  selectedColors: [],
  guesses: [],
  answerCodes: [],
  solution: ["red", "yellow", "red", "green"],
};

const actions = {
  SELECT_COLOR: "SELECT_COLOR",
  SUBMIT_GUESS: "SUBMIT_GUESS",
  RESET_SELECTED_COLORS: "RESET_SELECTED_COLORS",
};

function gameReducer(state, action) {
  switch (action.type) {
    case actions.SELECT_COLOR:
      let newColors = [...state.selectedColors, action.value];
      return { ...state, selectedColors: newColors };
    case actions.SUBMIT_GUESS:
      let newAnswerCodes = [
        ...state.answerCodes,
        compareToAnswer(action.value, state.solution),
      ];
      let newGuesses = [...state.guesses, action.value];
      return {
        ...state,
        guesses: newGuesses,
        answerCodes: newAnswerCodes,
        selectedColors: [],
      };
    case actions.RESET_SELECTED_COLORS:
      return { ...state, selectedColors: [] };
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
    selectColor: (value) => dispatch({ type: actions.SELECT_COLOR, value }),
    submitGuess: (value) => dispatch({ type: actions.SUBMIT_GUESS, value }),
    resetSelectColors: () => dispatch({ type: actions.RESET_SELECTED_COLORS }),
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function Board() {
  const {
    selectedColors,
    resetSelectColors,
    selectColor,
    submitGuess,
    guesses,
    answerCodes,
  } = useContext(GameContext);

  return (
    <Container className="main-container">
      <Grid className="gameboard" container spacing={3}>
        <Grid item xs={9}>
          <Card style={{ margin: "1em 0 1em 0", background: "lightgrey" }}>
            <CardContent>
              <h3>GUESSES:</h3>
              <Grid container container justify="center" spacing={2}>
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={{ margin: "1em 0 1em 0" }}>
            <h3>SELECT PEGS:</h3>
            <PegChoices numCols={4} />
            <hr />
            <h3>SELECTION:</h3>
            <DisplayRow
              className="selection"
              name={`selection`}
              colors={selectedColors}
            />
            <div>
              <button onClick={() => resetSelectColors()}>Reset</button>
              <button onClick={() => submitGuess(selectedColors)}>
                Submit
              </button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
