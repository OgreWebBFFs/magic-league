export const checkDetailsChanges = (initial, current) => !(initial.name === current.name
    && initial.welcome === current.welcome
    && initial.rounds === current.rounds
    && initial.snake === current.snake);

export const checkParticipantChanges = (initial, current) => {
  let i = 0;
  while (i < current.length) {
    if (initial[i].user.id !== current[i].id) {
      return true;
    }
    i += 1;
  }
  return false;
};

const prizeMatch = (a, b) => (
  a.name === b.name && a.image === b.image && !!a.foiled === !!b.foiled
);

export const checkPrizeChanges = (initial, current) => {
  if (current.length === 0) return initial.length !== 0;
  if (initial.length === 0) return current.length !== 0;

  const found = initial.findIndex((prize) => prizeMatch(prize, current[0]));
  if (found > -1) {
    return checkPrizeChanges(
      initial.slice(0, found).concat(initial.slice(found + 1)),
      current.slice(1),
    );
  }

  return true;
};
