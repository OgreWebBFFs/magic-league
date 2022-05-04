import React, {useEffect, useState} from 'react';
import { useWindowSize } from 'react-use';

import Logo from '../Logo';
import Drawer from '../Drawer';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav'; 
import MatchLogger from './MatchLogger';
import TradeLogger from './TradeLogger';
import Button from '../Button';


//TODO: Componentize some sort of app wrapper that can manage the 
//state of the match logger and things like modals,  and handle the toggling there
//rather than add/remove classes


const Navigation = ({isAdmin, currentUserId, unlockedUsers}) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContetSelector, setDrawerContentSelector] = useState("match-logger");

  const DrawerContents = {
    "match-logger": (props) => <MatchLogger {...props}/>,
    "trade-logger": (props) => <TradeLogger {...props}/>
  }


  const {width} = useWindowSize();
  const[isMobile, setIsMobile] = useState(false);
  useEffect(
    ()=>{
      setIsMobile(width<900)
    },[width]
  )

   let links = [
      {
        displayName:"My Profile",
        href: `users/${currentUserId}`
      },
      {
        displayName:"Profiles",
        href: 'users'
      }, 
      {
        displayName:"Browse Cards",
        href: 'browse'
      },
      {
        displayName:"League",
        dropdownItems: [
          {
            displayName:"Rules",
            href: 'rules'
          },
          {
            displayName:"Matches",
            href: 'matches'
          },
    
          {
            displayName: "Contact",
            href: 'mailto:ogretheleaguening@gmail.com?subject=From the Web App'
          }
        ]
      }
     

    ]

    if(isAdmin){
      links = [
        ...links,
        {
          displayName: "Admin",
          dropdownItems:[
            {
              displayName:"Admin Matches",
              href: 'admin/matches'
            },
            {
              displayName:"Admin Users",
              href: 'admin/users'
            },
            {
              displayName:"Admin Setting",
              href: 'admin/settings/1/edit'
            }
          ]
        }
        
      ]
    }

    return (
      <nav id="top-nav"  className={`nav ${isMobile ? 'nav--mobile' : 'nav--desktop'}`} role="navigation">
        <a href="/"   className='nav__logo' data-turbolinks="false">
          <Logo/>
        </a>
        <ul className='nav__links'>
          {isMobile  ? 
            <MobileNav links={links}/>
          :
            <DesktopNav links={links} />
          }
        </ul>
        <Button
          className="nav__match-logger-button"
          onClick={()=>{
            setDrawerContentSelector("match-logger");
            setIsDrawerOpen(true);
          }}>
          Log a match
        </Button>
        <Button
          className="nav__trade-logger-buton"
          onClick={()=>{
            setDrawerContentSelector("trade-logger")
            setIsDrawerOpen(true);
          }}>
          Make a Trade
        </Button>
        <Drawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)}>
          {isDrawerOpen && DrawerContents[drawerContetSelector]({
            currentUserId,
            unlockedUsers,
            close: () => setIsDrawerOpen(false)
          })}
        </Drawer>
      </nav>
    )
} 

export default Navigation