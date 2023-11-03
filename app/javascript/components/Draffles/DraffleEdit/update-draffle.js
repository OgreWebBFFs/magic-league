import xhrRequest from '../../../helpers/xhr-request';

const prepParticipants = (participants) => participants.map((participant, i) => ({
  user_id: participant.id,
  order: i + 1,
}));

const updateDraffle = async (draffle, participants, prizes, draffleDetails) => xhrRequest({
  url: `/draffles/${draffle.id}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({
      participants: prepParticipants(participants),
      prizes,
      ...draffleDetails,
    }),
  },
});

export default updateDraffle;
