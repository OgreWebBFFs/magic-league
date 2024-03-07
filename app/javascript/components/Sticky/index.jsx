import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';


const Sticky = ({ children }) => {
  const stickyRef = useRef(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((([e]) => {
      e.intersectionRatio < 1 ? setStuck(true) : setStuck(false)
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