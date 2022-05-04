import React, {useRef, useState, useEffect} from "react"
import Button from "../../Button"
import CardSelect from "./CardSelect"
import xhrRequest from "../../../helpers/xhr-request"

const createTrade = async (tradeData) => await xhrRequest({
   url: '/trades',
   options: {
      method: 'POST',
      body: JSON.stringify(tradeData)
   }
});

const TradeLogger = ({unlockedUsers, currentUserId, close, isOpen}) => {
   const otherUsers = unlockedUsers
      .filter(user => user.id !== currentUserId)
      .sort((a, b) => a.name.localeCompare(b.name))
   const [tradePartnerId, setTradePartnerId] = useState(otherUsers[0].id)
   const [shouldRenderContents, setShouldRenderContents] = useState(false);
   const [receiveCards, setReceiveCards] = useState([]);
   const [giveCards, setGiveCards] = useState([]);
   const [error, setError] = useState();
   const [success, setSuccess] = useState(false);

   useEffect(()=>{
      if(isOpen) {
         setShouldRenderContents(true);
      }
   }, [isOpen])
   useEffect(() => {
      setTimeout(() => {
         setError();
         setSuccess(false);
      }, 8000);
   }, [error, success]);
   const wrapperRef = useRef(null)

   const cleanUp = () =>{ 
      setShouldRenderContents(false);
      wrapperRef.current.removeEventListener('transitionend', cleanUp, false) 
   }
   
   const handleClose = () => {
      close();
      wrapperRef.current.addEventListener('transitionend', cleanUp, false)
   }

   const TradeProposalCreationErrorMessage = ({ badCards }) => (
      <div>
         <p>There was an issue with the following cards in your trade request:</p>
         <ul>
            {badCards.map(card => <li>{card}</li>)}
         </ul>
         <p>Please ensure all cards are available within that player's collection before proposing a trade.</p>
      </div>
   )

   const handleSubmit = async (e) => {
      e.preventDefault();

      const postBody = {
         from: {
            id: currentUserId,
            cards: giveCards.map(({ card }) => parseInt(card.id))
         },
         to: {
            id: parseInt(tradePartnerId),
            cards: receiveCards.map(({ card }) => parseInt(card.id))
         }
      };
      try{
         const response = await createTrade(postBody);
         console.log("success")
         setSuccess(true);
         setError();
      } catch (error) {
         console.log("failure");
         setSuccess(false);
         setError(error)
      }
   }

   const PlayerSelect = () => {
      return <select className="browser-default player-selector"  value={tradePartnerId} onChange={(e)=>{setTradePartnerId(e.target.value)}}>
          {otherUsers.map(user => <option key={`${user.name}-${user.id}`} value={user.id}>{user.name}</option>)}
      </select>
   }

    return (
        <div ref={wrapperRef} id="trade-logger" className={`trade-logger ${isOpen ?'trade-logger--open' :''}`}>
        {shouldRenderContents &&  
        <>
        <div className="trade-logger__overlay overlay" onClick={handleClose}></div>
        <div className="trade-logger__section">
          <Button className="trade-logger__close-button" onClick={handleClose}>
           <i className="fas fa-times"/>
          </Button>
           <form id="trade-form" onSubmit={handleSubmit}>
               <h3>Make a Trade</h3>
               <p>Who would you like to trade with</p>
               <PlayerSelect playerSelectKey='B'/>
               <p>What would you like to trade for</p>
               <CardSelect onUpdate={setReceiveCards} />
               <p>What are you offering</p>
               <CardSelect onUpdate={setGiveCards} />
               <Button type="submit" className="trade-logger_submit__button">Submit</Button>
           </form>
           {error && (<div>
            <p>There was an issue with the following cards in your trade request:</p>
            <ul>
               {error.data.invalid_trade_targets.map(card => <li>{card}</li>)}
            </ul>
            <p>Please ensure all cards are available within that player's collection before proposing a trade.</p>
           </div>)}
           {success && (
              <div>
                 <p>Success! Your trade proposal has been processed</p>
              </div>
           )}
        </div>
        </>
        }
      </div>
  
    )
}

export default TradeLogger