import React, { useState } from 'react';
import Select from 'react-select';
import Button from '../../Button';

const MultiplayerMatchLogger = ({ unlockedUsers, currentUserId }) => {
  const currentUser = unlockedUsers.find((user) => user.id === currentUserId);
  const [participants, setParticipants] = useState([currentUser]);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));

  return (
    <>
      <p>Who played?</p>
      <Select
        isMulti
        defaultValue={[currentUser]}
        options={unlockedUsers}
        onChange={(options) => setParticipants(options)}
        getOptionValue={({ id }) => id}
        getOptionLabel={({ name }) => name}
        className="match-logger__participant-select"
      />
      <p>Results</p>
      <ul>
        {participants.map((participant) => (
          <li style={{ display: 'flex' }}>
            <select style={{ width: 'auto' }}>
              { [...participants.keys()].map(
                (placement) => <option key={`${participant.name}-${placement + 1}`} value={placement + 1}>{placement + 1}</option>
              )}
            </select>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: '1 1 100%',
            }}
            >
              {participant.name}
            </div>
          </li>
        ))}
      </ul>
      <p>When?</p>
      <input id="match-date" defaultValue={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); }} type="date" name="match[date]" />
      <input id="match-time" defaultValue={selectedTime} onChange={(e) => { setSelectedTime(e.target.value); }} type="time" name="match[time]" />
      <Button type="submit" className="drawer_submit__button">Submit</Button>
    </>
  );
};

export default MultiplayerMatchLogger;
