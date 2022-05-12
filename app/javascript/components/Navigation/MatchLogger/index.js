import React, {useState} from "react"
import Button from "../../Button"
import PlayerSelect from "../PlayerSelect"

const MatchLogger = ({unlockedUsers, currentUserId}) => {
   const currentUserObject =  unlockedUsers.find(user => user.id === currentUserId)
   const sortedUsers = unlockedUsers.sort((a, b)  => a.name.localeCompare(b.name)); 
   
   const [playerA, setPlayerA] = useState(currentUserObject);
   const [playerB, setPlayerB] = useState(currentUserObject);
   const [selectedDate, setSelectedDate]=useState(new Date().toLocaleDateString('en-CA'))
   const [selectedTime, setSelectedTime]=useState(new Date().toLocaleTimeString('en-US', {hour12: false}))
   
    return (
      <form id="match-logger" action="/matches" acceptCharset="UTF-8" method="post">
         <h3>Log Match</h3>
         <p>Who played?</p>
            <PlayerSelect
               player={playerA}
               players={sortedUsers}
               setSelectedPlayer={setPlayerA}
               name={`match[playerA]`}/>
            <PlayerSelect
               player={playerB}
               players={sortedUsers}
               setSelectedPlayer={setPlayerB}
               name={`match[playerB]`}/>
         <p>Who won?</p>
         <select className="browser-default winner-selector" disabled={playerA === playerB} name="match[winner]">
            <option value={playerA.id}>{playerA.name}</option>
            <option value={playerB.id}>{playerB.name}</option>
            </select>
         <p>When?</p>
         <input id="match-date" defaultValue={selectedDate} onChange={(e)=>{setSelectedDate(e.target.value)}} type="date" name="match[date]"/>
         <input id="match-time" defaultValue={selectedTime} onChange={(e)=>{setSelectedTime(e.target.value)}} type="time" name="match[time]"/>
         <Button type="submit" className="drawer_submit__button">Submit</Button>
      </form>
   )
}

export default MatchLogger