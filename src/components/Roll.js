import React from 'react';

export default function Roll(props) {
  let Hscore = 0;
  let newHscore = 0;

  if (props.result) {
    console.log('time is' + props.time);
    Hscore = localStorage.getItem('high');
    console.log(Hscore);
    if (Hscore) {
      if (Hscore < props.time) {
        newHscore = Hscore;
      } else {
        newHscore = props.time;
        localStorage.setItem('high', newHscore);
      }
    } else {
      newHscore = props.time;
      localStorage.setItem('high', newHscore);
    }
  } else if (localStorage.getItem('high')) {
    newHscore = localStorage.getItem('high');
  } else {
    newHscore = 404;
  }

  return (
    <div className="status">
      <div>
        <h3>High Score</h3>
        <span>&#11167;</span>

        <h4>{newHscore > 0 && newHscore}sec</h4>
      </div>
      <button className="roll" onClick={props.values}>
        <h1>{props.result ? 'New Game' : 'Roll'}</h1>
      </button>
      <div>
        <h3>Your Time</h3>

        <span>&#11167;</span>
        <h4>{props.result ? props.time : 'Finish Game'}sec</h4>
      </div>
    </div>
  );
}
