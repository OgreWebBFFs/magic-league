import React, {useEffect, useState} from 'react';
import { useWindowSize } from 'react-use';

import Logo from '../Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav'; 

import Button from '../Button';


//TODO: Componentize some sort of app wrapper that can manage the 
//state of the match logger and things like modals,  and handle the toggling there
//rather than add/remove classes

const toggleMatchLogger = ()=>{
  const matchLogger = document.getElementById("match-logger");
  matchLogger.classList.toggle("active");
}

const Navigation = ({isAdmin, currentUserId}) => {
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
        href: 'trades'
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
        {isMobile  ? 
          <MobileNav links={links}/>
        :
          <DesktopNav links={links} />
        }
        <Button
          className="nav__match-logger-button"
          onClick={toggleMatchLogger}
          >
          Log a match
        </Button>
      </nav>
    )
} 

export default Navigation