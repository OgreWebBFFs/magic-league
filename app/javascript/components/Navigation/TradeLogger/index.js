import React, {useRef, useState, useEffect} from "react"
import Button from "../../Button"
import CardSelect from "./CardSelect"



const TradeLogger = ({unlockedUsers, currentUserId, close, isOpen}) => {
   const currentUserObject =  unlockedUsers.find(user => user.id === currentUserId)
   const otherUsers = unlockedUsers
      .filter(user => user.id !== currentUserId)
      .sort((a, b) => a.name.localeCompare(b.name))
   const [tradePartner, setTradePartner] = useState(otherUsers[0].id)
   const [shouldRenderContents, setShouldRenderContents] = useState(false);
   const [receiveCards, setReceiveCards] = useState([]);
   const [giveCards, setGiveCards] = useState([]);

   useEffect(()=>{
      if(isOpen) {
         setShouldRenderContents(true);
      }
   }, [isOpen])
   const wrapperRef = useRef(null)

   const cleanUp = () =>{ 
      setShouldRenderContents(false);
      wrapperRef.current.removeEventListener('transitionend', cleanUp, false) 
   }
   
   const handleClose = () => {
      close();
      wrapperRef.current.addEventListener('transitionend', cleanUp, false)
   }

   const handleSubmit = (e) => {
      console.log(e.target[2].value);
      e.preventDefault();
   }

   const PlayerSelect = () => {
      return <select className="browser-default player-selector"  value={tradePartner} onChange={(e)=>{setTradePartner(e.target.value)}}>
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
        </div>
        </>
        }
      </div>
  
    )
}

export default TradeLogger