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
        <div className="nav__mobile">
            <div className="nav__dropdown-wrapper">
                <Button className="nav__mobile-menu-toggle">▼</Button>
                <ul className='nav__dropdown'>{renderMobileNavLinks(links)}</ul>
            </div>
        </div>
    )
}
export default MobileNav