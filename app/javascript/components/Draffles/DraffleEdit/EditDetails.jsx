import React, { useState } from 'react';
import Toggle from '../../Toggle';
import Modal from '../../Modal';
import { toHTML } from 'discord-markdown';

const EditDetails = ({
  draffle,
}) => {
  const [draffleName, setDraffleName] = useState(draffle.name);
  const [draffleWelcome, setDraffleWelcome] = useState(draffle.welcome);
  const [rounds, setRounds] = useState(draffle.rounds);
  const [snake, setSnake] = useState(draffle.snake);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h2>Details</h2>
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
          <label htmlFor="draffle_welcome" className="with-sub-msg">
            Welcome
            <button
              type="button"
              className="sub-msg interactable"
              onClick={() => setShowModal(true)}
            >
              See Markdown
            </button>
          </label>
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
            onChange={(e) => {
              const num = Number.parseInt(e.target.value, 10);
              if (num >= 1) setRounds(num);
              if (num === 1) setSnake(false);
            }}
          />
        </div>
        <div className="form__field">
          <label className="with-sub-msg" htmlFor="snake-toggle" style={{ height: '3rem' }}>
            Snake?
            {rounds === 1 && (<span className="sub-msg">rounds must be greater than 1 to enable snake draft</span>)}
          </label>
          <Toggle
            name="snake-toggle"
            checked={snake}
            onClick={() => setSnake(!snake && rounds > 1)}
            options={['On', 'Off']}
          />
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div
              style={{ maxWidth: '80vw' }}
              dangerouslySetInnerHTML={{
                __html: toHTML(draffleWelcome),
              }}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default EditDetails;
