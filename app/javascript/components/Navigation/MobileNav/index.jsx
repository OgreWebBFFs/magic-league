import React from 'react';

import Button from '../../Button';

const MobileNav = ({ links }) => {
  const notification = links.some(link => link.notification);
  const renderMobileNavLinks = (linksArr) => linksArr.map((link) => {
    if (link.dropdownItems) {
      return renderMobileNavLinks(link.dropdownItems);
    }
    return (
      <li className="nav__link-wrapper" key={`${link.displayName}-mobilenav`}>
        <Button className="nav__link button--small button--ghost" href={`/${link.href}`}>{link.displayName}  {link.notification && <i className="fas fa-exclamation notification" />}</Button>
       
      </li>
    );
  });

  return (
    <li className="nav__dropdown-wrapper">
      <Button className="nav__mobile-menu-toggle">
        <i className="fas fa-caret-down" />
        {notification && <i className="fas fa-exclamation notification" />}
      </Button>
      <ul className="nav__dropdown">{renderMobileNavLinks(links)}</ul>
    </li>
  );
};
export default MobileNav;
