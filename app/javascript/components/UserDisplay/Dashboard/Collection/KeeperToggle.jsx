import classNames from 'classnames';
import React, { useState } from 'react';
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
        <div
            className={classNames('keeper-toggle', { enabled, interactive })}
            onClick={async () => {
                await storeKeeper({ collectionId, cardId, keeper: !enabled });
                setEnabled(!enabled)
            }}
            role='button'
        >
            <div className='icon'>
                <i className='fas fa-slash' style={{ position: 'absolute' }}/>
                <i className='fas fa-exchange-alt' />
            </div>
        </div>
    )
}

export default KeeperToggle;