import classNames from 'classnames';
import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';
import Button from '../../../Button';
import xhrRequest from '../../../../helpers/xhr-request';
import NoTradeIcon from '../../../Icons/NoTradeIcon';

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

const KeeperToggle = ({ collectionId, cardId, keeper }) => {
    const [enabled, setEnabled] = useState(keeper);
    const [animate, setAnimate] = useState(false);

    useEffectOnce(() => {
        // prevents initial animation on page load 
        setTimeout(() => setAnimate(true), 350);
    });

    return (
        <Button
            onClick={async () => {
                await storeKeeper({ cardId, collectionId, keeper: !enabled });
                setEnabled(!enabled);
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