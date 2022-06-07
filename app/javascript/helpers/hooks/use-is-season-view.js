import { useState, useEffect } from 'react';

const wasSeasonView = window.sessionStorage.getItem('isSeasonView');
let isSeasonViewGlobal = wasSeasonView === null || wasSeasonView === 'true';
let observers = [];

const toggleSeasonView = () => {
  isSeasonViewGlobal = !isSeasonViewGlobal;
  window.sessionStorage.setItem('isSeasonView', isSeasonViewGlobal);
  observers.forEach((update) => update(isSeasonViewGlobal));
};

const useIsSeasonView = () => {
  const [isSeasonView, setIsSeasonView] = useState(isSeasonViewGlobal);

  useEffect(() => {
    observers.push(setIsSeasonView);
    setIsSeasonView(isSeasonView);
    return () => {
      observers = observers.filter((update) => update !== setIsSeasonView);
    };
  }, []);

  return [isSeasonView, toggleSeasonView];
};

export default useIsSeasonView;
