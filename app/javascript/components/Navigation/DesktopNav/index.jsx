import React from 'react';
import Button from '../../Button';

const DesktopNav = ({ links }) => {
  const renderDesktopNavLinks = (linksArr) => linksArr.map((link) => {
    if (link.dropdownItems) {
      return (
        <li key={`${link.displayName}-dropdown`} className="nav__dropdown-wrapper">
          <Button className="nav__dropdown-toggle button--ghost button--small">
            {link.displayName}
            {link.notification && <i className='fas fa-exclamation-circle notification' />}
            <span>▼</span>
          </Button>
          <ul className="nav__dropdown">{renderDesktopNavLinks(link.dropdownItems)}</ul>
        </li>
      );
    }
    return (
      <li key={`${link.displayName}-inline`} className="nav__link-wrapper">
       <Button className="nav__link button--ghost button--small" href={`/${link.href}`}>
          {link.displayName}
          {link.notification && <i className="fas fa-exclamation-circle notification" />}
        </Button>
      </li>
    );
  });

  return (<>{renderDesktopNavLinks(links)}</>);
};
export default DesktopNav;
