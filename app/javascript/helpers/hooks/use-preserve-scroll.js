import { useEffect } from 'react';

export const forgetScroll = () => sessionStorage.removeItem('prevScrollY');

const usePreserveScroll = () => {

  const storeScroll = () => {
    sessionStorage.setItem("prevScrollY", window.scrollY);
    document.removeEventListener("turbolinks:before-visit", storeScroll);
  }

  const scrollToPrev = () => {
    const prevYPos = parseInt(sessionStorage.getItem('prevScrollY'), 10);
    if (prevYPos) window.scrollTo(0, prevYPos);
    forgetScroll();
  }

  useEffect(() => {
    document.addEventListener("turbolinks:before-visit", storeScroll);
  }, []);

  return { scrollToPrev };
}

export default usePreserveScroll;