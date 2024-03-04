import React, { useEffect } from 'react';
import xhrRequest from '../../helpers/xhr-request';
import useHashParams, { stringifyHash } from '../../helpers/hooks/use-hash-params';

const searchCards = async (query) => (await xhrRequest({
  url: `/cards?${query}`,
  options: {
    method: 'GET',
  },
})).data;

const AdvancedBrowseControls = ({ setCards }) => {
  const [hashParams] = useHashParams();
  
  useEffect(() => {
    const fetchCardResults = async () => {
      const cards = await searchCards(stringifyHash(hashParams));
      setCards(cards);
    }
    fetchCardResults();
  }, []);

  return (
    <h1>THESE ARE ADVANCED CONTROLS!</h1>
  );
}

export default AdvancedBrowseControls;