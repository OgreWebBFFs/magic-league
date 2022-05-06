import React, {useState} from "react"
import xhrRequest from "../../../helpers/xhr-request"
import Button from "../../Button"
import PlayerSelect from '../PlayerSelect';
import CardSelect from "./CardSelect"
import ResponseStatusMessage from "./ResponseStatusMessage";
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
   const [xhrResponse, setXhrResponse] = useState();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const postBody = buildTradeData(tradePartner.id, receiveCards, currentUserId, giveCards);
      try{
         const response = await createTrade(postBody);
         setXhrResponse(response);
         window.location.reload();
      } catch (error) {
         setXhrResponse(error.data);
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
               setSelectedPlayer={setTradePartner}
            />
            <p>What would you like to trade for</p>
            <CardSelect onUpdate={setReceiveCards} />
            <p>What are you offering</p>
            <CardSelect onUpdate={setGiveCards} />
            <Button type="submit" className="drawer_submit__button">Submit</Button>
         </form>
         <ResponseStatusMessage {...xhrResponse} />
      </>
    )
}

export default TradeLogger