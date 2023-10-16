import React from 'react';
import { CardGrid, CardImage } from '../../CardGrid';

const formatDateTime = (dateTimeUTC) => {
  const date = new Date(dateTimeUTC);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
}

const DraffleCompleted = ({ draffle, draft_board: { rounds } }) => (
    <>
      <h1>{draffle.name} is complete!</h1>
      {rounds.map((round, i) => (
        <>
          <h2>Round {i + 1}</h2>
          <CardGrid>
            {round.map((slot) => (
              <div className="slot">
                <div className="slot__header pick">Pick #{slot.pick_num}</div>
                <div className="slot__header date">{formatDateTime(slot.prize.updated_at)}</div>
                <div className="slot__user">By: {slot.user.name}</div>
                <div className="slot__prize">
                  <CardImage
                    imageUrl={slot.prize.image}
                    foiled={slot.prize.foiled}
                  />
                </div>
              </div>
            ))}
          </CardGrid>
        </>
      ))}
    </>
  )

export default DraffleCompleted;
