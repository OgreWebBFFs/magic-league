var Templates = (function () {
 // Grid Card Templates

  let emptyStateTemplate = (props) => {
    if (props.isViewingOwnProfile) {
      return `
    <div class="empty-card-view">
      <p class="empty-card-view__message">
        Hey, LISTEN! It look's like you haven't added any cards here yet.
      </p>
      <a class="empty-card-view__btn" href="${props.link}">
        ${props.ctaText}
      </a>
    </div>
   `
    } else {
      return `
      <div class="empty-card-view">
        <p class="empty-card-view__message">
          Drat! It look's like ${props.userName} hasn't added any cards here yet. 
        </p>
      </div>
    `
    }
  };
  
  let cardWithWishListToggle = (props) => {
    let card = props.card;
    let isOnWishList = Helpers.isOnList({
      card: card,
      list: props.listToCheckAgainst
    })
    let toggleStatus = isOnWishList ? 'active' : '';
    return `
      <div class="card-grid_card__wrapper">
        <div class="card-grid_card">
          <div class="wishlist-${card.id}__toggle card-grid_wishlist__toggle ${toggleStatus}" data-id="${card.id}">
            <i class="far fa-heart"></i>
          </div>
          <a href="/cards/${card.id}">
            <img alt="${card.name}" title="${card.name}" src="${card.image_url}">
          </a>
        </div>
      </div>
      `
  };

  let cardWithRemoveFromWishListToggle = (props) => {
    let card = props.card;
    let isOnWishList = Helpers.isOnList({
      card: card,
      list: props.listToCheckAgainst
    })
    let toggleStatus = isOnWishList ? 'active' : '';
    return `
      <div class="card-grid_card__wrapper" id="${card.id}__wishlist-removal-target">
        <div class="card-grid_card">
          <div class="wishlist-${card.id}__toggle card-grid_wishlist__toggle active" data-id="${card.id}">
            <i class="fas fa-times"></i>
          </div>
          <a href="/cards/${card.id}">
            <img alt="${card.name}" title="${card.name}" src="${card.image_url}">
          </a>
        </div>
      </div>
      `
  };

  let cardWithNoToggles = (props) => {
    let card = props.card;
    return `
      <div class="card-grid_card__wrapper">
        <div class="card-grid_card">
          <a href="/cards/${card.id}">
            <img alt="${card.name}" title="${card.name}" src="${card.image_url}">
          </a>
        </div>
      </div>
      `
  };

  //Table Row Templates
  let collectionRow = (props) => {
    let card = props.card;
    let tradableList = props.listToCheckAgainst;
    //To make getCardFromId key pair agnostic so we can use it here
    let filterByCardId = (tradableCard) => {
      if (tradableCard.card_id === card.id) {
        return true
      }
      return false;
    }
    let tradableCard = tradableList.filter(filterByCardId)[0] || {};
    let enableCheckBox = props.isViewingOwnProfile ? '' : 'disabled';
    let isOnTradeablesList = Helpers.isOnList({
      card: card,
      list: props.listToCheckAgainst,
      checkingAgainstTradables: true
    })
    let toggleStatus = isOnTradeablesList ? 'checked' : '';
 
    return `
      <div class="dashboard_card-view__row">
      <div class="dashboard_card-view__cell"><a href="/cards/${card.id}">${card.name}</a></div>
      <div class="dashboard_card-view__cell">
        <input class="dashboard_tradable__toggle tradable-toggle-${card.id}" type="checkbox" ${enableCheckBox}  ${toggleStatus} data-tradable-id="${tradableCard.id}" data-id="${card.id}" id= "${card.name}_${tradableCard.id}" >
        <label class="dashboard_tradable__label" for="${card.name}_${tradableCard.id}"></label>
      </div>
    </div>
    `
  }

  let wishlistRow = (props) => {
    let card = props.card;
    if (props.isViewingOwnProfile) {
      return `
        <div id="${card.id}-wishlist-row" class="dashboard_card-view__row wishlist-item">
          <div class="dashboard_card-view__cell">
            <a href="/cards/${card.id}">${card.name}</a>
          </div>
          <div class="dashboard_card-view__cell">
            <div class="wishlist-${card.id}__toggle dashboard_card-view_remove-from-wishlist__btn" data-id="${card.id}">
              <i class="fas fa-times"></i>
            </div>
          </div>
        </div>
       `
    } else {
      return `
        <div class="dashboard_card-view__row wishlist-item">
          <div class="dashboard_card-view__cell"><a href="/cards/${card.id}">${card.name}</a></div>
          <div class="dashboard_card-view__cell"></div>
        </div>
      `
    }
  }

  //Alert Templates 
  let alertTemplate = (key, value) => {
    return `
            <div id="alert__container" class="active alert alert-${key}">
            ${value}
                  <a class="close__button" href="#" onclick="Helpers.toggleElementById('alert__container')" data-turbolinks="false"><i class="fas fa-times"></i></a>
            </div>
          `
  };


  return {
    cardWithNoToggles : cardWithNoToggles,
    cardWithRemoveFromWishListToggle : cardWithRemoveFromWishListToggle,
    cardWithWishListToggle: cardWithWishListToggle,
    emptyStateTemplate : emptyStateTemplate,
    wishlistRow: wishlistRow,
    collectionRow: collectionRow,
    alertTemplate
  }
})();