import React, { useContext, useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { GameContext } from "./Gameboard";

function YouWonModal() {
  const { restart, guesses, solved } = useContext(GameContext);

  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={solved}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Content>
        <Modal.Description>
          <Header>You Won!</Header>
        </Modal.Description>
        <h3>{`It took you ${guesses.length} guesses to win`}</h3>
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

export default YouWonModal;
