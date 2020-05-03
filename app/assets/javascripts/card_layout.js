var CardLayout = (function () {

  //TODO: 
  // Seperate out templates and helper functions
  // Tradable toggles request broken
  // add some sort of Proptypes document
  // create a standard props object??
  // fix wishlist toggle on trades (card browse page)
  // set up navigation to match Jame's notes
  // tooltip to wishlist button
  // user profile on other page stretching
  // set up listeners for tabs onclicks
  // document off function read about 
  // auto update EMPTY STATE


  //TEMPLATES
  // Grid Card Templates

 let emptyStateTemplate = (props) => {
  if(props.isViewingOwnProfile) {
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
  }else {
    console.log(props)
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
    let isOnWishList = isOnlist({
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
          <img alt="${card.name}" title="${card.name}" src="${card.image_url}">
        </div>
      </div>
      `
  };

  let cardWithRemoveFromWishListToggle = (props) => {
    let card = props.card;
    let isOnWishList = isOnlist({
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
          <img alt="${card.name}" title="${card.name}" src="${card.image_url}">
        </div>
      </div>
      `
  };

  let cardWithNoToggles = (props) => {
    let card = props.card;
    return `
      <div class="card-grid_card__wrapper">
        <div class="card-grid_card">
          <img alt="${card.name}" title="${card.name}" src="${card.image_url}">
        </div>
      </div>
      `
  };

  //Table Row Templates
  let collectionRow = (props) => {
    let card = props.card;
    let enableCheckBox = props.isViewingOwnProfile ? '' : 'disabled';
    let isOnTradeablesList = isOnlist({
      card: card, 
      list: props.listToCheckAgainst, 
      checkingAgainstTradables: true
      })
    let toggleStatus = isOnTradeablesList ? 'checked' : '';
    return `
      <div class="dashboard_card-view__row">
      <div class="dashboard_card-view__cell">${card.name}</div>
      <div class="dashboard_card-view__cell">
        <input class="dashboard_tradable__toggle" type="checkbox" ${enableCheckBox}  ${toggleStatus} data-id=${card.id} id="${card.name}_${card.id}">
        <label class="dashboard_tradable__toggle" for="${card.name}_${card.id}"></label>
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
            ${card.name}
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
          <div class="dashboard_card-view__cell">${card.name}</div>
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

// CONTRUCTORS & DESTRUCTICONS

  let addCardRow = (props) => {
    let row
    switch (props.cardViewContext) {
      case 'collection':
        row = collectionRow({
          card: props.card,
          listToCheckAgainst: props.listToCheckAgainst,
          isViewingOwnProfile: props.isViewingOwnProfile
        })
        break;
      case 'wishlist':
        row = wishlistRow({
          card: props.card,
          isViewingOwnProfile: props.isViewingOwnProfile
        })
        break;
    }
    return row;
  }

  let addCardToGrid = (props) => {
    let gridCell;
    switch (props.cardViewContext) {
      case 'collection':
        gridCell = cardWithWishListToggle({
          card: props.card,
          listToCheckAgainst: props.listToCheckAgainst,
        })
        break;
      case 'wishlist':
        if (props.isViewingOwnProfile){
          gridCell = cardWithRemoveFromWishListToggle({
            card: props.card,
            listToCheckAgainst: props.listToCheckAgainst,
          })
        }else {
          gridCell = cardWithNoToggles ({
            card:props.card
          })
        }
        break;
    }
    return gridCell;
  }

  let addEmptyState = (props)=> {
    let emptyState
    console.log(props.userId)
    switch (props.cardViewContext) {
      case 'collection':
        emptyState =  emptyStateTemplate({
          ctaText: "Build your Collection",
          link: "/collections/"+props.userId+"/edit",
          isViewingOwnProfile: props.isViewingOwnProfile,
          userName: props.userName
        })
        break;
      case 'wishlist':
        emptyState =  emptyStateTemplate({
          ctaText: "Make some wishes ;)",
          link: "/trades",
          isViewingOwnProfile: props.isViewingOwnProfile,
          userName: props.userName
        })
        break;
    }
    return emptyState;
  }

  let populateGrid = (props) => {
    if (props.cards.length < 1) {
      $('#' + props.cardViewContext + '-grid').append(
        addEmptyState({
          userId: props.userId,
          userName: props.userName,
          isViewingOwnProfile: props.isViewingOwnProfile,
          cardViewContext: props.cardViewContext
        })
      )
    }else
    for (i = 0; i < props.cards.length; i++) {
      $('#' + props.cardViewContext + '-grid').append(
          addCardToGrid({
          cardViewContext: props.cardViewContext,
          card: props.cards[i], 
          listToCheckAgainst: props.currentUserWishList,
          isViewingOwnProfile: props.isViewingOwnProfile
        }
      ))
    }
  };

  let populateTable = (props) => {
    if (props.cards.length  < 1) {
      $('#' + props.cardViewContext + '-table').append(
        addEmptyState({
          userId: props.userId,
          userName: props.userName,
          isViewingOwnProfile: props.isViewingOwnProfile,
          cardViewContext: props.cardViewContext

        })
      )
    }else
    for (i = 0; i < props.cards.length; i++) {
      $('#' + props.cardViewContext + '-table').append(
        addCardRow({
          cardViewContext: props.cardViewContext,
          card: props.cards[i],
          isViewingOwnProfile: props.isViewingOwnProfile,
          listToCheckAgainst: props.tradableCards
        }))
    }
  }

  removeCardFromWishListUIElements = (props) => {
    let rowToRemove = document.getElementById(props.cardId + '-wishlist-row');
    let gridCardToRemove = document.getElementById(props.cardId + '__wishlist-removal-target');
    rowToRemove ? rowToRemove.parentNode.removeChild(rowToRemove) : null;
    gridCardToRemove ? gridCardToRemove.parentNode.removeChild(gridCardToRemove) : null;
  }

// Helpers

  let isOnlist = (props) => {
    let listIds
    //The tradables data is structured a little different from 
    //other card lists, this adapts the card ids for this function
    if (props.checkingAgainstTradables) {
      listIds = props.list.map(item => item.card_id);
    } else {
      listIds = props.list.map(item => item.id);
    }

    return (listIds.find(item => item === props.card.id) != undefined);
   
  }

  let getCardFromId = (targetId, allCardsInList) => {
    let targetCard = allCardsInList.filter(function (card) {
      return card.id == targetId
    })[0];
    return targetCard;
  }

//REQUESTS

  let wishlistGridToggleClickHandler = (props) => {
    $(document).off('click', '.card-grid_wishlist__toggle',
      function() {});
    $(document).on('click', '.card-grid_wishlist__toggle', function () {
      //Retrieve the classlist of the clicked toggle & make it an array
      let targetToggleClassList = $(this).attr("class").split(" ");
      //Grab the cardId from the data-id tag on the html
      let card_id = $(this).attr('data-id');
      //Get the target card object so we can grab other properties from it 
      let targetCard = getCardFromId(card_id, props.collectionCards);
      if (targetCard === undefined) {
        targetCard = getCardFromId(card_id, props.wishlist)
      }
      //In the case of the card grid toggle:
      //Check if card was is on the wishlist, or being is added 
      let wasOnWishlist = targetToggleClassList.includes('active');
      //Toggle all Wishlist Toggles for this card  
      $("." + targetToggleClassList[0]).toggleClass("active");
      if (props.isViewingOwnProfile) {
        if (wasOnWishlist) {
          removeCardFromWishListUIElements({
            cardId: card_id,
            targetToggleClassList: targetToggleClassList,
          });
        }else {
          $('#wishlist-table').append(addCardRow({
              cardViewContext: 'wishlist',
              card: targetCard,
              isViewingOwnProfile: props.isViewingOwnProfile,
            })
          )
          $('#wishlist-grid').append(addCardToGrid({
            cardViewContext: 'wishlist',
            card: targetCard,
            isViewingOwnProfile: props.isViewingOwnProfile,
            listToCheckAgainst: props.wishlist
          })
          )
        }
      };
      xhrRequest('/wishlists/' + props.currentUserId, "PUT", function (res) {
        wishlist = res;
      }, {
        card_id: card_id
      });
    });
  }
  let wishlistRowToggleClickHandler = (props) =>{
    $(document).off('click', '.dashboard_card-view_remove-from-wishlist__btn'),
      function () {};
    $(document).on('click', '.dashboard_card-view_remove-from-wishlist__btn', function () {
      let targetToggleClassList = $(this).attr("class").split(" ");
      console.log(targetToggleClassList)
      let card_id = $(this).attr('data-id');
      let targetCard = getCardFromId(card_id, props.wishlist);
      $("." + targetToggleClassList[0]).removeClass("active")
        removeCardFromWishListUIElements({
          cardId: card_id,
          targetToggleClassList: targetToggleClassList,
      });
      xhrRequest('/wishlists/' + props.currentUserId, "PUT", function (res) {
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


  let manageCardView = (props) => {
    const isViewingOwnProfile = (props.currentUserId === props.userId);
    
    startTradableRequestClickHandler(props.currentUserId, props.isViewingOwnProfile);
    wishlistGridToggleClickHandler({
      currentUserId: props.currentUserId, 
      collectionCards: props.collectionCards, 
      isViewingOwnProfile: isViewingOwnProfile,
      currentUserId: props.currentUserId, 
      wishlist: props.wishlist 
    });
    wishlistRowToggleClickHandler({
      currentUserId: props.currentUserId, 
      wishlist: props.wishlist 
    })
    populateGrid({
      cardViewContext: 'collection',
      cards:props.collectionCards, 
      currentUserWishList: props.currentUserWishlist,
      isViewingOwnProfile: isViewingOwnProfile,
      userName: props.userName,
      userId: props.userId

    });
    populateGrid({
      cardViewContext: 'wishlist',
      cards:props.wishlist, 
      currentUserWishList: props.currentUserWishlist,
      isViewingOwnProfile: isViewingOwnProfile,
      userName: props.userName,
      userId: props.userId
    });
    populateTable({
      cards: props.collectionCards,
      cardViewContext: 'collection',
      isViewingOwnProfile: isViewingOwnProfile,
      tradableCards: props.tradables,
      userName: props.userName,
      userId: props.userId
    });
    populateTable({
      cards: props.wishlist,
      cardViewContext: 'wishlist',
      isViewingOwnProfile: isViewingOwnProfile,
      tradableCards: props.tradables,
      userName: props.userName,
      userId: props.userId
    });
  };

  return {
    manageCardView: manageCardView
  }

})();
