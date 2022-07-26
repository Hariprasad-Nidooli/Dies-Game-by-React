
import Text from './components/Text';
import Roll from './components/Roll';
import React from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-typed-hooks/use-window-size';

import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

function App() {
  const [rand, setRand] = React.useState(allNewDies());

  const [open, setOpen] = React.useState(false);

  function allNewDies() {
    let val = [];
    for (let i = 0; i < 10; i++) {
      val.push(rollDie());
    }

    return val;
  }

  const [result, setResult] = React.useState(false);
  const [chime, setChime] = React.useState(0);

  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const held = rand.every((die) => die.isHeld);

    const reference = rand[0].value;
    const same = rand.every((die) => die.value === reference);

    if (held && same) {
      const endDate = new Date();
      const endTime = endDate.getTime();

      setResult(true);
      handleTime(endTime);
    }
  }, [rand]);

  function handleTime(b) {
    let yourTime = (b - chime) / 1000;
    setChime(yourTime);
    let High = localStorage.getItem('high');
    if (High > yourTime) {
      setOpen(true);
    }

    //localStorage.setItem('high',b-chime)
    console.log(yourTime / 1000);
    //console.log(localStorage.getItem('high'))
  }

  function handleChange(id) {
    const mi = rand.every((el) => !el.isHeld);
    if (mi) {
      const startDate = new Date();
      const startTime = startDate.getTime();
      setChime(startTime);
      console.log('started');
    }
    setRand((old) =>
      old.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    if (result) {
      console.log('finish');
    }
  }
  const dies = rand.map((prev) => {
    return (
      <Die
        id={prev.id}
        num={prev.value}
        register={handleChange}
        isHeld={prev.isHeld}
      />
    );
  });
  function rollDie() {
    return {
      value: Math.floor(Math.random() * 10),
      id: nanoid(),
      isHeld: false,
    };
  }

  function newDie() {
    if (result) {
      setResult(false);
      setRand(allNewDies());
    }
    setRand((old) =>
      old.map((die) => {
        return die.isHeld ? die : rollDie();
      })
    );
  }


  const handleToClose = () => {
    setOpen(false);
  };

  return (
    <div className="back">
      {result && <Confetti width={width} height={height} />}

      <div className="white">
        <Text />

        <Dialog open={open} onClose={handleToClose}>
          <DialogTitle>{'Congrats'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You got new high score
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <div className="dies">{dies}</div>
        <Roll
          values={newDie}
          result={result}
          time={chime}
          rand={rand}
        />
      </div>
    </div>
  );
}
export default App;
