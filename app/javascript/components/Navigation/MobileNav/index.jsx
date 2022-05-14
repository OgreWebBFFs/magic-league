import React from 'react';

import Button from '../../Button';

const MobileNav = ({ links }) => {
  const renderMobileNavLinks = (linksArr) => linksArr.map((link) => {
    if (link.dropdownItems) {
      return renderMobileNavLinks(link.dropdownItems);
    }
    return (
      <li className="nav__link-wrapper" key={`${link.displayName}-mobilenav`}>
        <a className="nav__link" href={`/${link.href}`}>{link.displayName}</a>
      </li>
    );
  });

  return (
    <li className="nav__dropdown-wrapper">
      <Button className="nav__mobile-menu-toggle">
        <i className="fas fa-caret-down" />
      </Button>
      <ul className="nav__dropdown">{renderMobileNavLinks(links)}</ul>
    </li>
  );
};
export default MobileNav;
