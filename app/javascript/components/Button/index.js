import React from 'react';
import classNames from 'classnames';

const Button = ({children, className, onClick, type="button"}) => (
        <button type={type} className={classNames('button', className)} onClick={()=>{onClick()}}>
        {children}
    </button>
)

export default Button