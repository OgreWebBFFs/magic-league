import xhrRequest from '../../../helpers/xhr-request';

const startDraffle = async (draffle) => {
  await xhrRequest({
    url: `/draffles/${draffle.id}/start`,
    options: {
      method: 'PUT',
    },
  });
  window.location.reload();
};

export default startDraffle;
