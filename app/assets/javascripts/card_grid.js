var CardGrid = (function(current_user, user, cards, wishlist) {
    
/*     function populate the grid with all avaible cards {
        grab cards from a variable cardContexts (wishlist, Collection etc) and userContext( current_user, and user); 
        
        methods (
            add wishlist toggles for current_user
            
            toggle cardCounter on for edit collection card grid/ and off for other views

            toggle propose trade button off for when user = current_user

            filter functions for these
        )
    }
     */
    var cardTemplate = function(card) {
        return `
        <div class="card-grid_card__wrapper">
          <div class="card-grid_card" href="/cards/${card.attributes.id}">
          <div class="card-grid_wishlist__toggle">
            <input class="card-grid_wishlist__toggle-checkbox" wish-list-id="${isOnWishlist('id', card.attributes.id, wishlist) === undefined ? -1 : isOnWishlist('id', card.attributes.id, wishlist).id}" data-id="${card.attributes.id}" id="wl-checkbox-for-${card.attributes.id}" type="checkbox" ${isOnWishlist('id', card.attributes.id, wishlist) === undefined ? '' : 'checked' }>
            <label class="card-grid_wishlist__toggle-label" for="wl-checkbox-for-${card.attributes.id}"></label>
          </div>
            <img alt="${card.attributes.name}" title="${card.attributes.name}" src="${card.attributes.image_url}">
          </div>
        </div>
        `
    };

    var isOnWishlist = function(key, value, arr){
        return arr.find(function(item) {
          return item[key] == value
        });
    }


   /*  function populate the grid with searched for cards{
        grab cards from a variable cardContexts (wishlist, Collection etc) and userContext( current_user, and user) on search;
        
        search function 

    }

     */


});