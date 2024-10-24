import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";

const useIsMobile = (initial) => {
    const [isMobile, setIsMobile] = useState(initial);
    const { width } = useWindowSize();
    useEffect(() => {
        setIsMobile(width <= 850);
    }, [width]);
    return isMobile;
};

export default useIsMobile;
