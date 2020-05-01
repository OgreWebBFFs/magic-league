var CardLayout = (function () {

  //TODO: 
  //'live' updates of wishlist and tradables or some spoof
  // Tradable toggles request broken
  // Need to make these populate functiions context agnostic
  // Update styles and refactor 


  // Grid Card Templates
  let cardGridTemplateWithWish = (card, wishListIds) => {
    let isOnWishList = isOnlist(card, wishListIds) === true ? 'active' : null;
    return `
      <div class="card-grid_card__wrapper">
        <div class="card-grid_card">
          <div class="card-grid_wishlist__toggle ${isOnWishList}" data-id="${card.id}">
            <i class="far fa-heart"></i>
          </div>
          <img alt="${card.name}" title="${card.name}" src="${card.image_url}">
        </div>
      </div>
      `
  };

  //Table Row Templates
  let rowWithTradables = (card, tradableCards, isViewingOwnProfile) => {
    let enableCheckBox = isViewingOwnProfile ? '' : 'disabled';
    let isOnTradeablesList = isOnlist(card, tradableCards, tradables) === true ? 'checked' : '';
    return `
      <div class="dashboard_card-view__row">
      <div class="dashboard_card-view__cell">${card.name}</div>
      <div class="dashboard_card-view__cell">
        <input class="dashboard_tradable__toggle" type="checkbox" ${enableCheckBox}  ${isOnTradeablesList} data-id=${card.id} id="${card.name}_${card.id}">
        <label class="dashboard_tradable__toggle" for="${card.name}_${card.id}"></label>
      </div>
    </div>
    `
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

  let populateGrid = (cards, currentUserWishlist) => {
    for (i = 0; i < cards.length; i++) {
      $('.card-grid').append(cardGridTemplateWithWish(cards[i], currentUserWishlist))
    }
  };

  let populateTable = (cards, tradableCards, isViewingOwnProfile) => {
    for (i = 0; i < cards.length; i++) {
      $('#collection-table').append(rowWithTradables(cards[i], tradableCards, isViewingOwnProfile))
    }

  }


  let isOnlist = function (card, list, tradables) {
    let listIds
    if (tradables) {
      listIds = list.map(item => item.card_id);
    } else {
      listIds = list.map(item => item.id);
    }


    if (listIds.find(item => item === card.id) != undefined) {
      return true;
    } else {
      return false;
    }
  }

  let startWishListRequestClickHandler = (currentUserId) => {
    $(document).off('click', '.card-grid_wishlist__toggle'),
      function () {};
    $(document).on('click', '.card-grid_wishlist__toggle', function () {
      $(this).toggleClass("active")
      card_id = $(this).attr('data-id');
      xhrRequest('/wishlists/' + currentUserId, "PUT", function (res) {
        wishlist = res;
      }, {
        card_id: card_id
      });
    });
  }

  let startTradableRequestClickHandler = (currentUserId, isViewingOwnProfile) => {
    $('.dashboard_tradable__toggle').on('click', function () {
      console.log($(this));
      id = $(this).attr('data-id');
      that = this;
      if ($(this).is(':checked')) {
        xhrRequest('/tradables', 'POST', function (res) {
          $(that).data('tradable-id', res.id)
          console.log(res);
        }, {
          card: {
            id: id
          }
        });
      } else {
        if ($(this).data('tradable-id') != undefined) {
          xhrRequest(`/tradables/${$(this).data('tradable-id')}`, 'DELETE',
            function (res) {
              console.log(res);
            }, {},
            function (res) {
              $('.section.full-page').prepend(alertTemplate('danger', res.responseText))
              window.scrollTo(0, 0);
              console.log(res)
            });
        }
      }
    });

  }

  // Exposed functions start here


  let populateCards = (cards, currentUserWishlist, tradableCards, currentUserId, userId) => {
    const isViewingOwnProfile = (currentUserId === userId);
    startTradableRequestClickHandler(currentUserId, isViewingOwnProfile);
    startWishListRequestClickHandler(currentUserId);
    populateGrid(cards, currentUserWishlist);
    populateTable(cards, tradableCards, isViewingOwnProfile);
    console.log(tradableCards);
  };

  return {
    populateCards: populateCards
  }

})();