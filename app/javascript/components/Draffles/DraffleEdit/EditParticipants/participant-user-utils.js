export const nonParticipantUsers = (users, participants) => (
  users.filter((user) => !participants.some((participant) => participant.id === user.id))
);

export const addParticipant = (user, participants) => (
  participants.concat(user)
);

export const removeParticipant = (participant, participants) => (
  participants.filter((toRemove) => toRemove.id !== participant.id)
);
