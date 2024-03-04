import React, { useEffect } from 'react';
import xhrRequest from '../../helpers/xhr-request';
import Button from '../Button';
import useHashParams, { stringifyHash } from '../../helpers/hooks/use-hash-params';

const hashParamStringVerbs = {
  name: "LIKE",
  oracle_text: "LIKE"
};

const acceptedParams = ([key]) => Object.keys(hashParamStringVerbs).includes(key);


const appliedParamsDescription = (hashParams) => Object.entries(hashParams).filter(acceptedParams).reduce((result, [key, value]) => (
    `${result}${result === '' ? '' : ' AND '}${key.replace("_", " ")} ${hashParamStringVerbs[key] || 'IS'} ${value.join(' OR ')}`
  ),"");

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: "var(--spacer-xl)" }}>
        <Button href="/browse" className="controls__action-button button--negative">
          <i className="fas fa-times" />
          Clear
        </Button>
        <Button href={`/advanced_browse#${stringifyHash(hashParams)}`} className="controls__action-button">
          Modify
          <i className="fas fa-arrow-right"/>
        </Button>
      </div>
      <div>
        {appliedParamsDescription(hashParams)}
      </div>
    </div>
  );
}

export default AdvancedBrowseControls;