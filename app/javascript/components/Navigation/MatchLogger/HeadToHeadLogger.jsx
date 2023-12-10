import React, { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import PlayerSelect from '../PlayerSelect';

const addZeroIfNeeded = (num) => num < 10 ? `0${num}` : num;

const getTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const date = addZeroIfNeeded(today.getDate());
  const month = addZeroIfNeeded(today.getMonth() + 1);
  return `${year}-${month}-${date}`;
}

const MatchLogger = ({ unlockedUsers, currentUserId }) => {
  const currentUserObject = unlockedUsers.find((user) => user.id === currentUserId);
  const sortedUsers = unlockedUsers.sort((a, b) => a.name.localeCompare(b.name));
  const utcOffset = (new Date().getTimezoneOffset() / 60) * -1;
  const [playerA, setPlayerA] = useState(currentUserObject);
  const [playerB, setPlayerB] = useState(currentUserObject);
  const [winnerId, setWinnerId] = useState();
  const [selectedDate, setSelectedDate] = useState(getTodaysDate());
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));

  useUpdateEffect(() => {
    if (winnerId !== playerA.id && winnerId !== playerB.id) {
      setWinnerId(playerA.id);
    }
  }, [playerA, playerB]);

  return (
    <>
      <p>Who played?</p>
      <PlayerSelect
        player={playerA}
        players={sortedUsers}
        setSelectedPlayer={setPlayerA}
      />
      <PlayerSelect
        player={playerB}
        players={sortedUsers}
        setSelectedPlayer={setPlayerB}
      />
      <p>Who won?</p>
      <select id="victor-selector" className="browser-default winner-selector" disabled={playerA === playerB} name="match[1]" onChange={(e) => setWinnerId(Number.parseInt(e.target.value, 10))}>
        <option value={playerA.id}>{playerA.name}</option>
        <option value={playerB.id}>{playerB.name}</option>
      </select>
      <input type="hidden" name="match[2]" value={winnerId === playerA.id ? playerB.id : playerA.id} />
      <input type="hidden" name="match[participants]" value={2} />
      <p>When?</p>
      <input id="match-date" defaultValue={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); }} type="date" name="match[date]" />
      <input id="match-time" defaultValue={selectedTime} onChange={(e) => { setSelectedTime(e.target.value); }} type="time" name="match[time]" />
      <input style={{display: 'none'}} defaultValue={utcOffset > 0 ? `+${utcOffset}` : utcOffset} type="text" name="match[zone]" />
    </>
  );
};

export default MatchLogger;
