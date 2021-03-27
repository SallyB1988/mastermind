import React, { Fragment, createContext, useContext, useReducer } from "react";
import _ from "lodash";
import PegChoices from "./PegChoices";
import DisplayGuess from "./DisplayGuess";
const initialState = {
  selectedColors: ["green"],
  guesses: [],
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
      let newGuesses = [...state.guesses, action.value];
      return { ...state, guesses: newGuesses, selectedColors: [] };
    case actions.RESET_SELECTED_COLORS:
      return { ...state, selectedColors: [] };
    default:
      return state;
  }
}

export default function GameBoard() {
  return (
    <Provider>
      <DumbComponent />
    </Provider>
  );
}

export const GameContext = createContext();

function Provider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const value = {
    selectedColors: state.selectedColors,
    guesses: state.guesses,
    selectColor: (value) => dispatch({ type: actions.SELECT_COLOR, value }),
    submitGuess: (value) => dispatch({ type: actions.SUBMIT_GUESS, value }),
    resetSelectColors: () => dispatch({ type: actions.RESET_SELECTED_COLORS }),
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function DumbComponent() {
  const {
    selectedColors,
    resetSelectColors,
    selectColor,
    submitGuess,
    guesses,
  } = useContext(GameContext);

  return (
    <Fragment>
      <div>
        <span>
          {selectedColors.map((c) => (
            <h5>{c}</h5>
          ))}
        </span>
      </div>
      <div>
        <h3>SELECT PEGS:</h3>
        <PegChoices numCols={4} />
      </div>
      <div>
        <h3>GUESSES:</h3>
        {guesses.map((i, idx) => {
          return (
            <DisplayGuess key={`row-${idx}`} name={`row-${idx}`} colors={i} />
          );
        })}
      </div>
      <div>
        <button onClick={() => resetSelectColors()}>Reset</button>
        <button onClick={() => submitGuess(selectedColors)}>Submit</button>
      </div>
    </Fragment>
  );
}
