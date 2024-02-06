import React, {forwardRef} from 'react';
import classNames from 'classnames';

const Button =forwardRef( ({
  children, className, onClick = () => {}, type = 'button', href, ...unspecifiedProps
}, ref) => {
  const Element = href ? 'a' : 'button';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Element ref={ref} type={type} className={classNames('button', className)} onClick={() => { onClick(); }} href={href} {...unspecifiedProps}>
      {children}
    </Element>
  );
});

export default Button;
