import React, {useRef, useState, useEffect} from "react"
import Button from "../../Button"

const MatchLogger = ({unlockedUsers, currentUserId, close, isOpen}) => {
   const currentUserObject =  unlockedUsers.find(user => user.id === currentUserId)
   const defaultPlayerSelection = {A:currentUserObject, B:currentUserObject}
   const [selectedPlayers, setSelectedPlayers] = useState(defaultPlayerSelection)
   const [shouldRenderContents, setShouldRenderContents] = useState(false)
   const [now, setNow] = useState()
   const [selectedDate, setSelectedDate]=useState()
   const [selectedTime, setSelectedTime]=useState()
   
   
   useEffect(()=>{
      if(isOpen) {
         setShouldRenderContents(true);
         const newNow = (new Date());
         setNow(
            {
               date: newNow.toLocaleDateString('en-CA'),
               time: newNow.toLocaleTimeString('en-US', { hour12: false }),
            }
         );
      }
      
   }, [isOpen])

   const sortedUsers = unlockedUsers.sort(function(a, b) {
      return a.name.localeCompare(b.name);
   }); 

   const wrapperRef = useRef(null)


   const cleanUp = () =>{ 
      setShouldRenderContents(false);
      setSelectedPlayers(defaultPlayerSelection); 
      wrapperRef.current.removeEventListener('transitionend', cleanUp, false) 
   }
   
   const handleClose = () => {
      close();
      wrapperRef.current.addEventListener('transitionend', cleanUp, false)
   }

   const handePlayerSelect = (e, playerSelectKey) => {
      const targetPlayer = unlockedUsers.find(user => user.id === parseInt(e.target.value))
      setSelectedPlayers({...selectedPlayers, [playerSelectKey]: targetPlayer});
   }

   const PlayerSelect = ({playerSelectKey}) => {
      return <select className="browser-default player-selector"  defaultValue={selectedPlayers[playerSelectKey].id} name={`match[player${playerSelectKey}]`} onChange={(e)=>{handePlayerSelect(e, playerSelectKey)}}>
          {sortedUsers.map(user => <option key={`${user.name}-${user.id}`} value={user.id}>{user.name}</option>)}
      </select>
      }

    return (
        <div ref={wrapperRef} id="match-logger" className={`match-logger ${isOpen ?'match-logger--open' :''}`}>
        {shouldRenderContents &&  
        <>
        <div className="match-logger__overlay overlay" onClick={handleClose}></div>
        <div className="match-logger__section">
          <Button className="match-logger__close-button" onClick={handleClose}>
           <i className="fas fa-times"/>
          </Button>
          <form id="match-logger" action="/matches" acceptCharset="UTF-8" method="post">

            <h3>Log Match</h3>
            <p>Who played?</p>
               <PlayerSelect playerSelectKey='A'/>
               <PlayerSelect playerSelectKey='B'/>
            <p>Who won?</p>
            <select className="browser-default winner-selector" disabled={selectedPlayers.A === selectedPlayers.B} name="match[winner]">
               <option value={selectedPlayers.A.id}>{selectedPlayers.A.name}</option>
               <option value={selectedPlayers.B.id}>{selectedPlayers.B.name}</option>
             </select>
            <p>When?</p>
            <input id="match-date" defaultValue={selectedDate || now.date} onChange={(e)=>{setSelectedDate(e.target.value)}} type="date" name="match[date]"/>
            <input id="match-time" defaultValue={selectedTime || now.time} onChange={(e)=>{setSelectedTime(e.target.value)}} type="time" name="match[time]"/>
            <input type="submit" onClick={handleClose} className="match-logger_submit__button button" />
            </form>
        </div>
        </>
        }
      </div>
  
    )
}

export default MatchLogger