import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';


const Sticky = ({ children, onUnstuck, onStuck }) => {
  const stickyRef = useRef(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((([e]) => {
      if (e.intersectionRatio < 1) {
        setStuck(true);
        onStuck();
      } else {
        setStuck(false);
        onUnstuck();
      }
    }), { threshold: [1] });

    if(stickyRef.current) observer.observe(stickyRef.current);

    return () => {
      if(stickyRef.current) observer.unobserve(stickyRef.current);
    }
  }, [stickyRef])
  
  return (
    <div ref={stickyRef} className={classNames("sticky", { stuck })}>
      {children}
    </div>
  )
}

export default Sticky;