import React, { useEffect, useState, useRef } from 'react';
import Button from '../Button';

const Drawer = ({ children, isOpen, close }) => {
  const [shouldRenderContents, setShouldRenderContents] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderContents(true);
    }
  }, [isOpen]);

  const wrapperRef = useRef(null);

  const cleanUp = () => {
    setShouldRenderContents(false);
    wrapperRef.current.removeEventListener('transitionend', cleanUp, false);
  };

  const handleClose = () => {
    close();
    wrapperRef.current.addEventListener('transitionend', cleanUp, false);
  };

  return (
    <div ref={wrapperRef} id="trade-logger" className={`drawer ${isOpen ? 'drawer--open' : ''}`}>
      {shouldRenderContents
        && (
        <>
          <div className="drawer__overlay overlay" onClick={handleClose} role="none" />
          <div className="drawer__section" role="dialog">
            <Button className="drawer__close-button button--small button--ghost " onClick={handleClose}>
              <i className="fas fa-times" />
            </Button>
            {children}
          </div>
        </>
        )}
    </div>
  );
};

export default Drawer;
