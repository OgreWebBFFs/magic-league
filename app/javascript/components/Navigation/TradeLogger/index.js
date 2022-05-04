import React, {useState, useEffect} from "react"
import xhrRequest from "../../../helpers/xhr-request"
import Button from "../../Button"
import PlayerSelect from '../PlayerSelect';
import CardSelect from "./CardSelect"
import buildTradeData from './build-trade-data';

const createTrade = async (tradeData) => await xhrRequest({
   url: '/trades',
   options: {
      method: 'POST',
      body: JSON.stringify(tradeData)
   }
});

const TradeLogger = ({unlockedUsers, currentUserId}) => {
   const otherUsers = unlockedUsers
      .filter(user => user.id !== currentUserId)
      .sort((a, b) => a.name.localeCompare(b.name))
   const [tradePartner, setTradePartner] = useState(otherUsers[0])
   const [receiveCards, setReceiveCards] = useState([]);
   const [giveCards, setGiveCards] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const postBody = buildTradeData(tradePartner.id, receiveCards, currentUserId, giveCards);
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
    return (
      <>
         <form id="trade-form" onSubmit={handleSubmit}>
            <h3>Make a Trade</h3>
            <p>Who would you like to trade with</p>
            <PlayerSelect
               player={tradePartner}
               players={otherUsers}
               setPlayerSelect={setTradePartner}
            />
            <p>What would you like to trade for</p>
            <CardSelect onUpdate={setReceiveCards} />
            <p>What are you offering</p>
            <CardSelect onUpdate={setGiveCards} />
            <Button type="submit" className="drawer_submit__button">Submit</Button>
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
      </>
    )
}

export default TradeLogger