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

const KeeperToggle = ({ collectionId, cardId, keeper, disabled }) => {
    const [enabled, setEnabled] = useState(keeper)

    if (disabled && !keeper) return null;

    return (
        <Button
            className={classNames('card-grid__icon')}
            onClick={async () => {
                await storeKeeper({
                    collectionId, cardId, keeper: !enabled
                });
                setEnabled(!enabled)
            }}
            style={{
                background: 'var(--color-fill-negative)',
                opacity: enabled ? '1' : '.6',
            }}
            disabled={disabled}
        >
            <i className='fas fa-slash' style={{ position: 'absolute' }}/>
            <i className='fas fa-exchange-alt' />
        </Button>
    )
}

export default KeeperToggle;