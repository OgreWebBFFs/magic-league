import React from 'react';

import Button from '../../Button';

const MobileNav = ({links}) => {
    const renderMobileNavLinks = (linksArr) => linksArr.map((link, i)=>{
            if(link.dropdownItems){
               return  renderMobileNavLinks(link.dropdownItems) 
            } else {
                return  <li className="nav__link-wrapper" key={`${link.displayName}-${i}`}>
                    <a className="nav__link" data-turbolinks="false" href={`/${link.href}`}>{link.displayName}</a> 
                </li>
            }
            }
        )


    return (
        <li className="nav__dropdown-wrapper">
            <Button className="nav__mobile-menu-toggle">
                <i className="fas fa-caret-down"></i>
            </Button>
            <ul className='nav__dropdown'>{renderMobileNavLinks(links)}</ul>
        </li>
    )
}
export default MobileNav