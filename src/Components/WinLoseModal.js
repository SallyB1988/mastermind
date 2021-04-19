import React, { useContext } from "react";
import { Button, Modal, Image } from "semantic-ui-react";
import { GameContext } from "./Gameboard";
import DisplayRow from "./DisplayRow";
import { YouWon, YouLose } from "../images";

function WinLoseModal() {
  const { restart, guesses, solved, lost, solution } = useContext(GameContext);

  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size="tiny"
      open={solved || lost}
      trigger={open}
    >
      <Modal.Content>
        {solved ? (
          <>
            <Image src={YouWon} alt={"You won"} />
            <h3>{`It took you ${guesses.length} guesses to win`}</h3>
          </>
        ) : (
          <>
            <Image src={YouLose} alt={"You lost"} />
            <h3>{`Solution:`}</h3>
            <DisplayRow
              className="selection"
              name={`solution`}
              colors={solution}
            />
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            restart();
            setOpen(false);
          }}
        >
          Restart
        </Button>
        <Button
          content="Close"
          labelPosition="right"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default WinLoseModal;
