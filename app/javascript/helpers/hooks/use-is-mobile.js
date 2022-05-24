import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { width } = useWindowSize();
  useEffect(() => {
    setIsMobile(width <= 850);
  }, [width]);
  return isMobile;
};

export default useIsMobile;
