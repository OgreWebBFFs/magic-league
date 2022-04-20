import React from 'react';




const MobileNav = ({links}) => {

    const renderMobileNavLinks = (linksArr) => linksArr.map((link, i)=>{
            if(link.dropdownItems){
               return  renderMobileNavLinks(link.dropdownItems) 
            } else {
                return  <li key={`${link.displayName}-${i}`}>
                    <a data-turbolinks="false" href={`/${link.href}`}>{link.displayName}</a> 
                </li>
            }
            }
        )


    return (
        <li class="nav_mobile">
            <a class="drop-down__toggle nav__dropdown-toggle" onclick="Helpers.toggleElementById('dd-menu-mobile')">
            &#9660;
            </a>
            <ul id="dd-menu-mobile" class="dropdown__content">
                {renderMobileNavLinks(links)}
            </ul>
             
        </li>
    )
}
export default MobileNav