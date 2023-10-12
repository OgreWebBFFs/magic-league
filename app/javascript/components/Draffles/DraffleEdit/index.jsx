import React, { useState } from 'react';
import Toggle from '../../Toggle';

const DraffleEdit = ({
  draffle,
}) => {
  const [draffleName, setDraffleName] = useState(draffle.name);
  const [draffleWelcome, setDraffleWelcome] = useState(draffle.welcome);
  const [rounds, setRounds] = useState(draffle.rounds);
  const [snake, setSnake] = useState(draffle.snake);
  
  return (
    <>
      <h1>Draffle Creation Portal</h1>
      <h2>Details:</h2>
      <div className="form">
        <div className="form__field">
          <label htmlFor="draffle_name">Name</label>
          <input
            id="draffle_name"
            type="text"
            value={draffleName}
            onChange={(e) => setDraffleName(e.target.value)}
          />
        </div>
        <div className="form__field">
          <label htmlFor="draffle_welcome">Welcome</label>
          <textarea
            name="text"
            id="text"
            value={draffleWelcome}
            onInput={(e) => setDraffleWelcome(e.target.value)}
          />
        </div>
        <div className="form__field">
          <label htmlFor="draffle_rounds">Rounds</label>
          <input
            id="draffle_rounds"
            type="number"
            value={rounds}
            onChange={(e) => e.target.value >= 1 && setRounds(e.target.value)}
          />
        </div>
        <div className="form__field">
          <label htmlFor="snake-toggle" style={{ display: 'flex', alignItems: 'center', height: '3rem' }}>Snake?</label>
          <Toggle
            name="snake-toggle"
            checked={snake}
            onClick={() => setSnake(!snake && rounds > 1)}
            options={['On', 'Off']}
          />
        </div>
      </div>
    </>
  );
};

export default DraffleEdit;
