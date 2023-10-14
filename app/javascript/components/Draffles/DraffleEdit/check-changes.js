export const detailsChanged = (initial, current) => !(initial.name === current.name
    && initial.welcome === current.welcome
    && initial.rounds === current.rounds
    && initial.snake === current.snake);

export const checkParticipantChanges = () => {};
