import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import xhrRequest from '../../helpers/xhr-request';
import Button from '../Button';
import useHashParams, { stringifyHash } from '../../helpers/hooks/use-hash-params';
import Sticky from '../Sticky';
import { forgetScroll } from '../../helpers/hooks/use-preserve-scroll';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hashParams] = useHashParams();
  
  useEffect(() => {
    const fetchCardResults = async () => {
      const cards = await searchCards(stringifyHash(hashParams));
      setCardsCount(cards.length);
      setCards(cards);
    }
    fetchCardResults();
  }, []);
  return (
    <Sticky onUnstuck={() => setDrawerOpen(false)}>
      <div className={classNames("advanced-search__controls", { shadowed: !drawerOpen})}>
        <Button
          className="advanced-search__controls--drawer-toggle button--secondary"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <i className={classNames('fas fa-caret-down', { drawerOpen })} />
          {cardsCount} cards
        </Button>
        <Button
          className="advanced-search__controls--edit-search"
          href={`/advanced_search#${stringifyHash(hashParams)}`}
        >
          Edit Search
        </Button>
      </div>
      <div className={classNames("advanced-search__drawer shadowed", { drawerOpen })}>
        <h1>
          {typeof cardsCount === 'undefined' ? "Searching for" : `Found ${cardsCount}`} cards where
        </h1>
        <ul>
          {(() => {
            const [first, ...rest] = appliedParamsDescription(hashParams);
            return (
              <>
                <li key={first?.replace(/\s/ig, "")}>{first}</li>
                {rest.map((str) => <li key={str.replace(/\s/ig,"")}>AND {str}</li>)}
              </>
            )
          })()}
        </ul>
      </div>
    {cardsCount === 0 && (
        <div className="advanced-search__no-cards-found">
          <p className="emoji">🚫</p>
        </div>
      )}
    </Sticky>
  );
}

export default AdvancedBrowseControls;