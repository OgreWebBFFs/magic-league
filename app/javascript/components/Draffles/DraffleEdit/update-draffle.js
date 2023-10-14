import xhrRequest from '../../../helpers/xhr-request';

const prepParticipants = (participants) => participants.map((participant, i) => ({
  user_id: participant.id,
  order: i + 1,
}));

const updateDraffle = async (draffleId, participants, prizes, draffle) => xhrRequest({
  url: `/draffles/${draffleId}`,
  options: {
    method: 'PUT',
    body: JSON.stringify({
      participants: prepParticipants(participants),
      prizes,
      ...draffle,
    }),
  },
});

export default updateDraffle;
