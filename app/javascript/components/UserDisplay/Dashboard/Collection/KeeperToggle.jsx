import classNames from 'classnames';
import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';
import Button from '../../../Button';
import xhrRequest from '../../../../helpers/xhr-request';

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
    const [enabled, setEnabled] = useState(keeper || undefined);
    const [animate, setAnimate] = useState(false);

    useEffectOnce(() => {
        // prevents initial animation on page load 
        setTimeout(() => setAnimate(true), 350);
    });

    return (
        <Button
            onClick={async () => {
                await storeKeeper({ cardId, collectionId, enabled: !enabled });
                setEnabled(!enabled);
            }}
            style={{ position: 'relative', overflow: 'visible' }}
        >
            <div className={classNames('card-grid__card-action--toggle-indicator', {enabled, animate})}>
                <span style={{ display: 'grid', placeItems: 'center' }}>
                    <i className={classNames('fas fa-slash')} style={{ fontSize: '1.3rem' }} />
                    <i className={classNames("fas fa-exchange-alt")} style={{ position: 'absolute', fontSize: '1.3rem' }}/>
                </span>
            </div>
            {enabled ? 'Kept!' : 'Keeplist'}
        </Button>
    )
}

export default KeeperToggle;