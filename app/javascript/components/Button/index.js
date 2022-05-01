import React from 'react';
import classNames from 'classnames';

const Button = ({children, className, onClick, type="button", href, ...rest}) => {

    const LinkAsButton = ()=> (<a className={classNames('button', className)} type="link" href={href}>{children}</a>) 

    const Element = 
        href ? 
        <LinkAsButton/> 
        : 
        <button {...rest} type={type} className={classNames('button', className)} onClick={()=>{onClick()}}>
            {children}
        </button>;

    return Element
    }

export default Button