import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { useEffectOnce } from 'react-use';
import Button from '../../../Button';
import xhrRequest from '../../../../helpers/xhr-request';
import NoTradeIcon from '../../../Icons/NoTradeIcon';
import KeeplistContext from '../../../../contexts/KeeplistContext';

const storeKeeper = ({ collectionId, cardId, keeper }) => xhrRequest({
    url: `/collections/${collectionId}`,
    options: {
      method: 'PUT',
      body: JSON.stringify({
        id: collectionId,
        keeper: {
          keeper,
          card_id: cardId,
          collection_id: collectionId,
        },
      }),
    },
  });

const KeeperToggle = ({ collectionId, cardId }) => {
    const [animate, setAnimate] = useState(false);
    const {keeplist, setKeeplist} = useContext(KeeplistContext);

    const enabled = keeplist.some((card) => card.id === cardId);

    useEffectOnce(() => {
        // prevents initial animation on page load 
        setTimeout(() => setAnimate(true), 350);
    });

    return (
        <Button
            onClick={async () => {
                await storeKeeper({ cardId, collectionId, keeper: !enabled });
                if (!enabled) {
                    setKeeplist([...keeplist, { id: cardId }]);
                } else {
                    setKeeplist(keeplist.filter((card) => card.id !== cardId));
                }
            }}
            style={{ position: 'relative', overflow: 'visible' }}
        >
            <div className={classNames('card-grid__card-action--toggle-indicator', {enabled, animate})}>
                <NoTradeIcon />
            </div>
            {enabled ? 'Kept!' : 'Keeplist'}
        </Button>
    )
}

export default KeeperToggle;