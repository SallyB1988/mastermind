export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function createSolution(numPegs, colorSet) {
  let solution = [];
  while (solution.length < numPegs) {
    const index = getRandomInt(numPegs);
    solution.push(colorSet[index]);
  }
  return solution;
}

export function splitIntoChunks(arr, chunk) {
  let newArr = [];
  while (arr.length > 0) {
    let tempArray;
    tempArray = arr.splice(0, chunk);
    newArr.push(tempArray);
  }
  return newArr;
}

export const compareToAnswer = (guess, solution) => {
  let guessCopy = [...guess];
  let answKey = [];
  let solutionCopy = [...solution];
  // find ones that are right color right place
  for (let i = 0; i < guess.length; i++) {
    if (solutionCopy[i] === guess[i]) {
      answKey.push("black");
      guessCopy[i] = "";
      solutionCopy[i] = "";
    }
  }
  // now the answerKey has white pegs for pegs in correct location
  // those items have been removed from the guessCopy array
  // now look for any black pegs
  guessCopy.forEach((item) => {
    if (item !== "") {
      let idx = solutionCopy.indexOf(item);
      if (idx >= 0) {
        answKey.push("white");
        solutionCopy[idx] = "";
      }
    }
  });
  return answKey;
};
