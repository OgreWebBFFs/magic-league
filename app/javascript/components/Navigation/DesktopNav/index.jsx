import React from 'react';
import Button from '../../Button';

const DesktopNav = ({ links }) => {
  const renderDesktopNavLinks = (linksArr) => linksArr.map((link) => {
    if (link.dropdownItems) {
      return (
        <li key={`${link.displayName}-dropdown`} className="nav__dropdown-wrapper">
          <Button className="nav__dropdown-toggle">
            {link.notification && <i className='fas fa-exclamation-circle' style={{marginRight: '0.5rem'}} />}
            {link.displayName}
            {' '}
            ▼
          </Button>
          <ul className="nav__dropdown">{renderDesktopNavLinks(link.dropdownItems)}</ul>
        </li>
      );
    }
    return (
      <li key={`${link.displayName}-inline`} className="nav__link-wrapper">
        <a className="nav__link" href={`/${link.href}`}>{link.displayName}</a>
        {link.notification && <i className="fas fa-exclamation" />}
      </li>
    );
  });

  return (<>{renderDesktopNavLinks(links)}</>);
};
export default DesktopNav;
