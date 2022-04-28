import React, {useRef, useState} from "react";
import classNames from "classnames";

import Button from "../Button";


const Rankings = ({rankedPlayers, unrankedPlayers}) => {
    const [showRankings, setShowRankings] = useState(true)

    const rankingsRef= useRef(null);
    const rankingsBorderRef =  useRef(null);

    const getPlayers = (playerArr, isRanked=true) => playerArr.map((user, i)=>{
       const  {name, id, ranking, wins=0, losses=0} = user.table   
        return (
            <Button key={`${name}-${id}`}className={classNames("rankings__user-button", {"rankings__user-button--unranked": !isRanked})} href={`/users/${id}`}>
               { isRanked && <div className="rankings__player-position">
                    {i+1}
                </div>
                }
                <div className="rankings__player">
                    <div className={classNames("rankings__player-name", {"rankings__player-name--unranked": !isRanked})}>
                        {name}
                    </div>
                    <div className="rankings__player-stats">
                   { isRanked &&  <div className="rankings__player-elo">
                        {ranking}
                    </div>
                   }
                    <div className="rankings__player-record">
                            {wins}-{losses}
                    </div>
                    </div>
                </div>
            </Button>
        )
    })

    const toggleRankingsVisible = () => {
        const dateForm =  document.querySelector(".rankings__date_form");
        dateForm.classList.toggle("rankings__date_form--hidden");
        setShowRankings(!showRankings)
    }

    return (
    <>
   <div ref={rankingsRef} className={classNames("rankings", "container", {"rankings--hidden":!showRankings})}>      
        <Button className={"button--ghost rankings__title"} onClick={()=>{toggleRankingsVisible()}} >
            Rankings
        </Button>
    
        <div className={"rankings__wrapper"}>
       
            <svg ref={rankingsBorderRef} className="rankings__border" xmlns="http://www.w3.org/2000/svg">
                <rect className="rankings__border-shape1"/>
            </svg>
          
            
            <div className="rankings__scroll-catcher">
            <div className="rankings__vert-centerer">
                <div className="rankings__player-listing">
                <div id="ranked-players" className="rankings__player-bucket">
                    {getPlayers(rankedPlayers)}
                </div>
                <hr className="rankings__divider"/>
                <div id="unranked-players" className="rankings__player-bucket">
                    {getPlayers(unrankedPlayers, false)}
                </div>
                </div>
            </div>
            </div>

        </div>
     
    </div> 
    { !showRankings &&
    <Button className={classNames("rankings__toggle-visbility-button", "button--inverse")} onClick={()=>{toggleRankingsVisible()}}> <i className="fas fa-list"></i></Button>}
    </>
    )
}

export default Rankings