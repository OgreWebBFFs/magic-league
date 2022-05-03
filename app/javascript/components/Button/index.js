import React from 'react';
import classNames from 'classnames';

const Button = ({children, className, onClick, type="button", href, ...unspecifiedProps }) => {
    const Element = href ? "a" : "button";
    
    return (
        <Element type={type} className={classNames('button', className)} onClick={()=>{onClick()}} href={href} {...unspecifiedProps}>
            {children}
        </Element>
    )

    }

export default Button