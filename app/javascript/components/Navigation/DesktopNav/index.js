import React from 'react';

const DesktopNav = ({links}) => {
    console.log(links)
    const renderDesktopNavLinks = (linksArr) => linksArr.map((link, i)=>{
        if(link.dropdownItems){
           return (
               <li>{link.displayName}
                    <ul>{renderDesktopNavLinks(link.dropdownItems)}</ul>
                </li>
           )
        } else {
            return  <li key={`${link.displayName}-${i}`}>
                <a data-turbolinks="false" href={`/${link.href}`}>{link.displayName}</a> 
            </li>
        }
        }
    )


    return (
        <ul class="nav__desktop">
            {renderDesktopNavLinks(links)}
        </ul>
    )
}
export default DesktopNav