import classNames from 'classnames';
import React, { useState } from 'react';
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

const KeeperToggle = ({ collectionId, cardId, keeper, interactive }) => {
    const [enabled, setEnabled] = useState(keeper)

    if (!interactive && !keeper) return null;

    return (
        <Button onClick={() => setEnabled(!enabled)} className={classNames('button--togglable button--small', {on: enabled})} style={{ flexDirection: 'column' }}>
            <span style={{ display: 'grid', placeItems: 'center', marginRight: '4px' }}>
                <i className={classNames({ 'fas fa-circle': !enabled, 'fas fa-ban': enabled })} style={{ fontSize: '1.6rem' }} />
                <i className={classNames("fas fa-exchange-alt", { 'hollow-text': !enabled })} style={{ position: 'absolute', fontSize: '1rem' }}/>
            </span>
            {enabled ? 'won\'t trade' : 'will trade'}
        </Button>
    )
}

export default KeeperToggle;