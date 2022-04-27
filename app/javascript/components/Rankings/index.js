import React, {useRef} from "react";
import classNames from "classnames";

import Button from "../Button";


const Rankings = ({rankedPlayers, unrankedPlayers}) => {
    const getPlayers = (playerArr, isRanked=true) => playerArr.map((user, i)=>{
       const  {name, id, ranking, wins=0, losses=0} = user.table   
        return (
            <Button className={classNames("rankings__user-button", {"rankings__user-button--unranked": !isRanked})} href={`/users/${id}`}>
               { isRanked && <div class="rankings__player-position">
                    {i+1}
                </div>
                }
                <div class="rankings__player">
                    <div className={classNames("rankings__player-name", {"rankings__player-name--unranked": !isRanked})}>
                        {name}
                    </div>
                    <div class="rankings__player-stats">
                   { isRanked &&  <div class="rankings__player-elo">
                        {ranking}
                    </div>
                   }
                    <div class="rankings__player-record">
                            {wins}-{losses}
                    </div>
                    </div>
                </div>
            </Button>
        )
    })



    return (

   <div class="rankings container">
        <h1 class="rankings__title">Rankings</h1>
      
        <div class="rankings__wrapper">
       
            <svg  class="rankings__border" xmlns="http://www.w3.org/2000/svg">
                <rect class="rankings__border-shape1"/>
            </svg>
          
            
            <div class="rankings__scroll-catcher">
            <div class="rankings__vert-centerer">
                <div class="rankings__player-listing">
                <div id="ranked-players" class="rankings__player-bucket">
                        {getPlayers(rankedPlayers)}
                </div>
                <hr class="rankings__divider"/>
                <div id="unranked-players" class="rankings__player-bucket">
                     {getPlayers(unrankedPlayers, false)}
                </div>
                </div>
            </div>
            </div>
         
        </div>
    </div> 
    )
}

export default Rankings