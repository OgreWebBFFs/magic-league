import React from 'react';

const ParticipantOrderer = ({
  participant,
  participants,
  onOrder,
}) => {
  const orderUp = (toOrder) => {
    const newArr = [...participants];
    const i = newArr.indexOf(toOrder);
    if (i > 0) {
      [newArr[i], newArr[i - 1]] = [newArr[i - 1], newArr[i]];
      onOrder(newArr);
    }
  };

  const orderDown = (toOrder) => {
    const newArr = [...participants];
    const i = newArr.indexOf(toOrder);
    if (i < newArr.length - 1) {
      [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
      onOrder(newArr);
    }
  };

  return (
    <div className="edit-participants__picker-order">
      <button
        type="button"
        onClick={() => orderUp(participant)}
        className="edit-participants__picker-order--button up"
      >
        <i className="fas fa-caret-up" />
      </button>
      <button
        type="button"
        onClick={() => orderDown(participant)}
        className="edit-participants__picker-order--button down"
      >
        <i className="fas fa-caret-down" />
      </button>
    </div>
  );
};

export default ParticipantOrderer;
