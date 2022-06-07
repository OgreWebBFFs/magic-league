import React, { useState } from 'react';
import Button from '../../../Button';
import Modal from '../../../Modal';

const InformationModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard__objectives-heading--info">
      <Button onClick={() => setShowModal(true)}>
        <i className="fa fa-info-circle" />
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>About Quests</h3>
          <p className="quest-info__detail">
            Quests are like personal objectives that you can complete to earn points.
            (Winning isn&apos;t everything!) If you fulfill the conditions of a quest
            during a leauge event with your Commander Legends deck, you can complete
            it by clicking the
            <i className="fa fa-flag-checkered" />
            icon.
          </p>
          <p className="quest-info__detail">
            When you complete a quest, you earn 2 points and receive a new quest that
            can be completed in any subsequent game.
          </p>
          <p className="quest-info__detail">
            Players can&apos;t see each others&apos; quests until after they&apos;ve been
            completed.
          </p>
          <p className="quest-info__detail">
            If you can&apos;t complete--or don&apos;t like--a quest, you can click
            <i className="fa fa-random" />
            to re-roll the quest. This will immediately give you a new random quest
            you&apos;ve never seen before. You gain 1 re-roll each week, so use them wisely!
          </p>
        </Modal>
      )}
    </div>
  );
};

export default InformationModal;
