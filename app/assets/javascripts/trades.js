var Trades = (function() {
    let tradeModalContent = (card, users, current_user_id) => {
      let content = `
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
      `;
        
      if (users.length == 1) {
        content += `
          <input type="hidden" name="trade[user_id]" value="${users[0].id}"/>
        `;
      }
      
      content += `
          <button type="submit" class="trade-modal_send__btn">Send Message</button>
        </form>
      `;

      return content;
    }

    let tradeModal = (card, users, current_user_id) => {
        if (users.length == 0) {
          return `
            <button class="modal__close-button" href="#" onclick="Helpers.toggleElementById('trade-modal')">
            <i class="fas fa-times"></i>
            </button>
            <h4 class="modal__title">Oh no!</h4>
            <p>No one owns this card! 😭</p>
          `;
        } else if (users.length == 1) {
          if (users[0].id == current_user_id) {
            return `
            <button class="modal__close-button" href="#" onclick="Helpers.toggleElementById('trade-modal')">
            <i class="fas fa-times"></i>
            </button>
            <h4 class="modal__title">Oh no!</h4>
            <p>You are the only user who owns this card! 😭</p>
          `;
          } else {
            return tradeModalContent(card, users, current_user_id);
          }
        } else if (users.length > 1) {
          return tradeModalContent(card, users, current_user_id);
        } else {
          return `
            <button class="modal__close-button" href="#" onclick="Helpers.toggleElementById('trade-modal')">
            <i class="fas fa-times"></i>
            </button>
            <h4 class="modal__title">Oh no!</h4>
            <p>This is an unexpected state!  If you see this, can you let an admin know which card this is, pretty please?</p>
            <p>😭😭😭😭</p>
          `;
        }
    }

    return {
      tradeModal: tradeModal
    }
})();