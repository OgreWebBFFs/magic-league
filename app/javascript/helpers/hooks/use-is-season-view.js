import { useState, useEffect } from 'react';

let isSeasonViewGlobal = true;
let observers = [];

const toggleSeasonView = () => {
  isSeasonViewGlobal = !isSeasonViewGlobal;
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
