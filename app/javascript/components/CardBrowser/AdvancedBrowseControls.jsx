import React, { useEffect, useState } from 'react';
import xhrRequest from '../../helpers/xhr-request';
import Button from '../Button';
import useHashParams, { stringifyHash } from '../../helpers/hooks/use-hash-params';

const APPLIED_FILTER_STR_TEMPLATES = {
  name: { prefix: 'the name is like', joiner: 'or' },
  oracle_text: { prefix: 'the rules text contains', joiner: 'or' },
  card_types: { prefix: 'the card type is', joiner: 'or' },
  sub_types: { prefix: 'the subtype contains', joiner: 'or'},
  colors_exact: { prefix: 'the colors are exactly', joiner: 'and' },
  colors_include: { prefix: 'the colors include', joiner: 'or' },
  colors_atmost: { prefix: 'the colors are only', joiner: 'or' },
  rarity: { prefix: 'the rarity is', joiner: 'or' },
  sets: { prefix: 'belongs to the set', joiner: 'or'},
  owned: { prefix: 'there is at least one owner in the league' },
}

const appliedParamsDescription = (hashParams) => Object.entries(APPLIED_FILTER_STR_TEMPLATES)
  .filter(([key]) => typeof hashParams[key] !== 'undefined')
  .map(([key, value]) => (
    `${value.prefix} ${value.joiner ? hashParams[key].map((val) => `"${val}"`).join(` ${value.joiner} `) : ''}`
  ));


const searchCards = async (query) => (await xhrRequest({
  url: `/cards?${query}`,
  options: {
    method: 'GET',
  },
})).data;

const AdvancedBrowseControls = ({ setCards }) => {
  const [cardsCount, setCardsCount] = useState();
  const [hashParams] = useHashParams();
  // const { scrollToPrev, forgetScroll } = usePreserveScroll();
  
  useEffect(() => {
    const fetchCardResults = async () => {
      const cards = await searchCards(stringifyHash(hashParams));
      setCardsCount(cards.length);
      setCards(cards);
    }
    fetchCardResults();
  }, []);
  return (
    <div style={typeof cardsCount === 'undefined' ? {height: '5000px'} : {}}>
      <div className="advanced-browse__controls">
        <Button
          href="/browse"
          className="controls__action-button button--negative"
        >
          <i className="fas fa-times" />
          Clear
        </Button>
        <Button
          href={`/advanced_browse#${stringifyHash(hashParams)}`}
          className="controls__action-button"
        >
          Modify
          <i className="fas fa-arrow-right"/>
        </Button>
      </div>
      <div className="advanced-browse__description">
        <h1 className="heading">
          {typeof cardsCount === 'undefined' ? "Searching for" : `Found ${cardsCount}`} cards where:</h1>
        <ul className="content">
          {(() => {
            const [first, ...rest] = appliedParamsDescription(hashParams);
            return (
              <>
                <li key={first.replace(/\s/ig, "")}>{first}</li>
                {rest.map((str) => <li key={str.replace(/\s/ig,"")}>AND {str}</li>)}
              </>
            )
          })()}
        </ul>
      </div>
      {cardsCount === 0 && (
        <div className="advanced-browse__no-cards-found">
          <p className="emoji">🚫</p>
          No cards found for the current selections. Please modify and try again.
        </div>
      )}
    </div>
  );
}

export default AdvancedBrowseControls;