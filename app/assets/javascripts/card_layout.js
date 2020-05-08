var CardLayout = (function () {

  //TODO: 
  // create a standard props object??
  // tooltip for wishlist button and tradables
  // set up listeners for tabs onclicks
  // document off function read about 



  //TEMPLATES


  // CONTRUCTORS & DESTRUCTICONS

  let addCardRow = (props) => {
    let row
    switch (props.cardViewContext) {
      case 'collection':
        row = Templates.collectionRow({
          card: props.card,
          listToCheckAgainst: props.listToCheckAgainst,
          isViewingOwnProfile: props.isViewingOwnProfile
        })
        break;
      case 'wishlist':
        row = Templates.wishlistRow({
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
        gridCell = Templates.cardWithWishListToggle({
          card: props.card,
          listToCheckAgainst: props.listToCheckAgainst,
        })
        break;
      case 'wishlist':
        if (props.isViewingOwnProfile) {
          gridCell = Templates.cardWithRemoveFromWishListToggle({
            card: props.card,
            listToCheckAgainst: props.listToCheckAgainst,
          })
        } else {
          gridCell = Templates.cardWithNoToggles({
            card: props.card
          })
        }
        break;
    }
    return gridCell;
  }

  let addEmptyState = (props) => {
    
    let emptyState
    switch (props.cardViewContext) {
      case 'collection':
        emptyState = Templates.emptyStateTemplate({
          ctaText: "Build your Collection",
          link: "/collections/" + props.userId + "/edit",
          isViewingOwnProfile: props.isViewingOwnProfile,
          userName: props.userName
        })
        break;
      case 'wishlist':
        emptyState = Templates.emptyStateTemplate({
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
    } else
      for (i = 0; i < props.cards.length; i++) {
        $('#' + props.cardViewContext + '-grid').append(
         addCardToGrid({
            cardViewContext: props.cardViewContext,
            card: props.cards[i],
            listToCheckAgainst: props.currentUserWishList,
            isViewingOwnProfile: props.isViewingOwnProfile
          }))
      }
  };

  let populateTable = (props) => {
    if (props.cards.length < 1) {
      $('#' + props.cardViewContext + '-table').append(
       addEmptyState({
          userId: props.userId,
          userName: props.userName,
          isViewingOwnProfile: props.isViewingOwnProfile,
          cardViewContext: props.cardViewContext

        })
      )
    } else
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
  let removeEmptyState = (isViewingOwnProfile) => {
    let isWishListEmpty = $('.wishlist-item').length;
    if(!isWishListEmpty && isViewingOwnProfile) {
      $(".empty-card-view").remove();

    }
  } 
  let removeCardFromWishListUIElements = (props) => {
    let rowToRemove = document.getElementById(props.cardId + '-wishlist-row');
    let gridCardToRemove = document.getElementById(props.cardId + '__wishlist-removal-target');
    rowToRemove ? rowToRemove.parentNode.removeChild(rowToRemove) : null;
    gridCardToRemove ? gridCardToRemove.parentNode.removeChild(gridCardToRemove) : null;
    //check dom to see if there is a wishlist anymore
    let isWishListEmpty = $('.wishlist-item').length;
    if(!isWishListEmpty){
      $('#wishlist-grid').append(
        addEmptyState({
          userId: props.userId,
          userName: props.userName,
          userId: props.userId,
          isViewingOwnProfile: props.isViewingOwnProfile,
          cardViewContext: 'wishlist'
        })
      );
      $('#wishlist-table').append(
        addEmptyState({
          userId: props.userId,
          userName: props.userName,
          isViewingOwnProfile: props.isViewingOwnProfile,
          cardViewContext: 'wishlist'
        })
      )


    }
  }

  // Helpers



  let getCardFromId = (targetId, allCardsInList) => {
    let targetCard = allCardsInList.filter(function (card) {
      return card.id == targetId
    })[0];
    return targetCard;
  }

  //REQUESTS

  let wishlistGridToggleClickHandler = (props) => {
    $(document).off('click', '.card-grid_wishlist__toggle',
      function () {});
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
            isViewingOwnProfile: props.isViewingOwnProfile,
            userName: props.userName,
            userName: props.userId
            
          });
        } else {
          removeEmptyState(props.isViewingOwnProfile);
          $('#wishlist-table').append(addCardRow({
            cardViewContext: 'wishlist',
            card: targetCard,
            isViewingOwnProfile: props.isViewingOwnProfile,
          }))
          $('#wishlist-grid').append(addCardToGrid({
            cardViewContext: 'wishlist',
            card: targetCard,
            isViewingOwnProfile: props.isViewingOwnProfile,
            listToCheckAgainst: props.wishlist
          }))
        }
      };
      xhrRequest('/wishlists/' + props.currentUserId, "PUT", function (res) {
        wishlist = res;
      }, {
        card_id: card_id
      });
    });
  }
  let wishlistRowToggleClickHandler = (props) => {
    $(document).off('click', '.dashboard_card-view_remove-from-wishlist__btn'),
      function () {};
    $(document).on('click', '.dashboard_card-view_remove-from-wishlist__btn', function () {
      let targetToggleClassList = $(this).attr("class").split(" ");
      let card_id = $(this).attr('data-id');
      let targetCard = getCardFromId(card_id, props.wishlist);
      $("." + targetToggleClassList[0]).removeClass("active")
      removeCardFromWishListUIElements({
        cardId: card_id,
        targetToggleClassList: targetToggleClassList,
        isViewingOwnProfile: props.isViewingOwnProfile,
        userName: props.userName,
        userName: props.userId
        
      });
      xhrRequest('/wishlists/' + props.currentUserId, "PUT", function (res) {
        wishlist = res;
      }, {
        card_id: card_id
      });
    });

  }

  let tradableToggleClickHandler = (props) => {
    $(function () {
      $('.dashboard_tradable__toggle').on('click', function () {
        id = $(this).attr('data-id');
        that = this;
        let tradableId = $(this).attr('data-tradable-id');
        $(".tradable-toggle-"+id).prop("checked", this.checked);
        if ($(this).is(':checked')) {
         
           xhrRequest('/tradables', 'POST', function (res) {
            $(that).data('tradable-id', res.id)
          }, {
            card: {
              id: id
            }
          });
        } else {
          if ($(this).data('tradable-id') != undefined) {
            xhrRequest(`/tradables/${$(this).data('tradable-id')}`, 'DELETE',
              function (res) {
              }, {},
              function (res) {
                $('.section.full-page').prepend(Templates.alertTemplate('danger', res.responseText))
                window.scrollTo(0, 0);
              });
          }
        }
      });
    });

  };

  // Exposed functions start here


  let manageCardView = (props) => {
    const isViewingOwnProfile = (props.currentUserId === props.userId);

    tradableToggleClickHandler({
      currentUserId: props.currentUserId,
      isViewingOwnProfile: isViewingOwnProfile,
      tradableCards: props.tradables,
    });
    wishlistGridToggleClickHandler({
      currentUserId: props.currentUserId,
      collectionCards: props.collectionCards,
      isViewingOwnProfile: isViewingOwnProfile,
      currentUserId: props.currentUserId,
      wishlist: props.wishlist,
      userName: props.userName,
    });
    wishlistRowToggleClickHandler({
      currentUserId: props.currentUserId,
      userId: props.userId,
      userName: props.userName,
      wishlist: props.wishlist,
      isViewingOwnProfile: isViewingOwnProfile
    })
    populateGrid({
      cardViewContext: 'collection',
      cards: props.collectionCards,
      currentUserWishList: props.currentUserWishlist,
      isViewingOwnProfile: isViewingOwnProfile,
      userName: props.userName,
      userId: props.userId

    });
    populateGrid({
      cardViewContext: 'wishlist',
      cards: props.wishlist,
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
      userName: props.userName,
      userId: props.userId
    });
  };

  return {
    manageCardView: manageCardView,
  }

})();