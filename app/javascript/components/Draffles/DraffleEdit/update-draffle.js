import xhrRequest from "../../../helpers/xhr-request";

const prepParticipants = (participants) => participants.map((participant, i) => ({
  user_id: participant.id,
  order: i + 1,
}));

const randomize = (array) => {
  const newArr = [...array];
  let m = newArr.length - 1;
  while (m >= 0) {
    const i = Math.floor(Math.random() * m);
    const temp = newArr[m];
    newArr[m] = newArr[i];
    newArr[i] = temp;
    m -= 1;
  }
  return newArr;
};

const updateDraffle = async (draffleId, participants, prizes, random, rounds, snake) => xhrRequest({
  url: `/draffles/${draffleId}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({
      participants: random
        ? prepParticipants(randomize(participants))
        : prepParticipants(participants),
      prizes,
      rounds: Number.parseInt(rounds, 10),
      snake,
    }),
  },
});

export default updateDraffle;
