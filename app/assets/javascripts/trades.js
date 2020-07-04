var Trades = (function() {
    let tradeModal = (card, users, current_user_id) => {
        if ((users.length > 1) || (users[0].id != current_user_id) ) {
          return `
            <button class="modal__close-button" href="#" onclick="Helpers.toggleElementById('trade-modal')">
              <i class="fas fa-times"></i>
            </button>
            <h4 class="modal__title" >Email Proposal</h4>
            <p>You are contacting:</p>
            ` +
            users.filter(function(user){return user.id != current_user_id}).map(function(user) {
              return `
                <ul class="trade-modal_partner-list">
                  ${user.attributes.name}
                </ul>
                `
              }).join("\n")
            +
            `
            <p>To talk about trading for <span class="card-to-be-traded">${card.attributes.name}</span></p>
            <form action="/trades" method="post"> 
              <input type="hidden" name="authenticity_token" value="${token}">
              <input type="hidden" name="trade[card_id]" value="${card.id}"/>
              <button type="submit" class="trade-modal_send__btn">Send Message</button>
            </form>
            </div>
          `;
        } else {
          return `
            <button class="modal__close-button" href="#" onclick="Helpers.toggleElementById('trade-modal')">
            <i class="fas fa-times"></i>
            </button>
            <h4 class="modal__title">Oh no!</h4>
            <p>You are the only user who owns this card. 😭</p>
          `;
        }
        
    }

    return {
      tradeModal: tradeModal
    }
})();