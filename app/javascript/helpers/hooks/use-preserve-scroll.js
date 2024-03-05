import { useEffect } from 'react';

const usePreserveScroll = () => {

  const storeScroll = () => {
    console.log("STORING SCROLL AS:", window.scrollY);
    sessionStorage.setItem("prevScrollY", window.scrollY);
    document.removeEventListener("turbolinks:before-visit", storeScroll);
  }
  
  const forgetScroll = () => sessionStorage.removeItem('prevScrollY');

  const scrollToPrev = () => {
    const prevYPos = parseInt(sessionStorage.getItem('prevScrollY'), 10);
    if (prevYPos) window.scrollTo(0, prevYPos);
    forgetScroll();
  }

  useEffect(() => {
    document.addEventListener("turbolinks:before-visit", storeScroll);
  }, []);

  return { scrollToPrev, forgetScroll };
}

export default usePreserveScroll;