import React, { useState, useRef } from 'react';
import useIsMobile from '../../helpers/hooks/use-is-mobile';

import Logo from '../Logo';
import Drawer from '../Drawer';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import MatchLogger from './MatchLogger';
import TradeLogger from './TradeLogger';
import Button from '../Button';

// TODO: Componentize some sort of app wrapper that can manage the
// state of the match logger and things like modals,  and handle the toggling there
// rather than add/remove classes
const DrawerContents = {
  'match-logger': ({ currentUserId, unlockedUsers }) => <MatchLogger currentUserId={currentUserId} unlockedUsers={unlockedUsers} />,
  'trade-logger': ({ currentUserId, unlockedUsers }) => <TradeLogger currentUserId={currentUserId} unlockedUsers={unlockedUsers} />,
};


const Navigation = ({ isAdmin, currentUserId, unlockedUsers, notifications }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContetSelector, setDrawerContentSelector] = useState('match-logger');
  const isMobile = useIsMobile();
  const navRef = useRef();

  let links = [
    {
      displayName: 'My Profile',
      href: `users/${currentUserId}`,
      notification: notifications.pendingTradeOffer,
    },
    {
      displayName: 'Browse Cards',
      href: 'browse',
    },
    {
      displayName: 'League',
      notification: notifications.newAnnouncement,
      dropdownItems: [
        {
          displayName: 'Announcements',
          notification: notifications.newAnnouncement,
          href: 'announcements',
        },
        {
          displayName: 'Matches',
          href: 'matches',
        },
        {
          displayName: 'Rules',
          href: 'rules',
        },
      ],
    },
  ];

  if (isAdmin) {
    links = [
      ...links,
      {
        displayName: 'Admin',
        dropdownItems: [
          {
            displayName: 'Admin Matches',
            href: 'admin/matches',
          },
          {
            displayName: 'Admin Users',
            href: 'admin/users',
          },
          {
            displayName: 'Admin Setting',
            href: 'admin/settings/1/edit',
          },
          {
            displayName: 'Admin Objectives',
            href: 'admin/objectives',
          },
          {
            displayName: 'Draffle Portal',
            href: 'draffles',
          },
        ],
      },

    ];
  }

  return (
    <nav ref={navRef} id="top-nav" className={`nav ${isMobile ? 'nav--mobile' : 'nav--desktop'}`} role="navigation">
      <a href="/" className="nav__logo" aria-label='home'>
        <Logo />
      </a>
      <ul className="nav__links">
        {isMobile
          ? <MobileNav links={links} />
          : <DesktopNav links={links} />}
      </ul>
      <Button
        className="nav__match-logger-button button--small"
        onClick={() => {
          setDrawerContentSelector('match-logger');
          setIsDrawerOpen(true);
        }}
      >
        <i className="fas fa-magic" />
      </Button>
      <Button
        className="nav__trade-logger-button button--small"
        onClick={() => {
          setDrawerContentSelector('trade-logger');
          setIsDrawerOpen(true);
        }}
      >
        <i className="fas fa-exchange-alt" />
      </Button>
      <Drawer isOpen={isDrawerOpen} close={() => setIsDrawerOpen(false)}>
        {isDrawerOpen && DrawerContents[drawerContetSelector]({
          currentUserId,
          unlockedUsers,
        })}
      </Drawer>
    </nav>
  );
};

export default Navigation;
