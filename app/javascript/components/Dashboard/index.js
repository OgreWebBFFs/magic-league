import React, {useState} from 'react';
import {
  CardList,
  CollectionRow,
  TradableToggle
} from './CardList';
import CardGrid from './CardGrid';
import EmptyState from './EmptyState';

const Dashboard = (props) => {
  const [isListView, setIsListView] = useState(true);
  const [tradables, setTradables] = useState(props.tradables);
  const isEmpty = props.collectionCards.length < 1;
  const isOwner = props.currentUserId === props.user.id 
  return  (
    <>
      <div className="dashboard_card-interface_action-bar">    
        <div className="dashboard_card-interface_view-toggles">
          <div id="collection-table-toggle" className={`dashboard_card-interface_collection_toggle-card-view__btn ${isListView ? 'active' : ''}`} onClick={() => setIsListView(true)}>
            <i className="fas fa-list"></i>
          </div>
          <div id="collection-grid-toggle" className={`dashboard_card-interface_collection_toggle-card-view__btn ${!isListView ? 'active' : ''}`} onClick={() => setIsListView(false)}>
            <i className="fas fa-th-large"></i>
          </div>
        </div>
        {props.edit && (
          <>
            <a className="dashboard_card-interface_action__btn" href={`/collections/${props.user.id}/edit`}>Edit</a>
            <a className="dashboard_card-interface_action__btn" href={`/collections/${props.user.id}/bulk_edit`}>Bulk Edit</a>
          </>
        )}
      </div>
      {isEmpty ? <EmptyState isOwner={isOwner} user={props.user} /> : null }
      {isListView && !isEmpty ? (
        <CardList> 
          {props.collectionCards.map((card, row) => (
            <CollectionRow>
              <a href={`/cards/${card.id}`}>{card.name}</a>
              <TradableToggle 
                isOwner={isOwner}
                tradables={tradables}
                setTradables={setTradables}
                card={card}
                row={row} />
            </CollectionRow>
          ))}
        </CardList>): null }
      {!isListView && !isEmpty ? <CardGrid {...props} /> : null }
    </>
  );
}
export default Dashboard;