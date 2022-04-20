import React, {useEffect, useState} from 'react';
import { useWindowSize } from 'react-use';

import Logo from '../Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav'; 

const Navigation = ({isAdmin, currentUserId}) => {
  const {width} = useWindowSize();
  const[isMobile, setIsMobile] = useState(false);
  useEffect(
    ()=>{
      setIsMobile(width<850)
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
              href: 'admin/Users'
            },
            {
              displayName:"Admin Setting",
              href: '<%= edit_admin_setting_path(1) %>'
            }
          ]
        }
        
      ]
    }


    return (
      <nav id="top-nav" class="nav" role="navigation">
        <div class="nav__container">
          <a href="/" class="nav_logo" data-turbolinks="false">
              <Logo/>
          </a>
          {isMobile  ? 
            <MobileNav links={links}/>
          :
            <DesktopNav links={links} />
          }
          <li class="nav_menu-match-logger__toggle-wrapper">
                <a href="#" class="nav_match-logger__btn">
                Log a match
                </a>
          </li>
        </div>
      </nav>
    )
} 

export default Navigation