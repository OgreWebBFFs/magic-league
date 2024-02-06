import React, { useState } from 'react';
import Select from 'react-select';
import PlacementSelector from './PlacementSelector';

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
      <PlacementSelector participants={participants} />
      <input type="hidden" name="match[participants]" value={participants.length} />
      <input type="hidden" name="match[event]" value={1} />
      <p>When?</p>
      <input id="match-date" defaultValue={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); }} type="date" name="match[date]" />
      <input id="match-time" defaultValue={selectedTime} onChange={(e) => { setSelectedTime(e.target.value); }} type="time" name="match[time]" />
    </>
  );
};

export default MultiplayerMatchLogger;
