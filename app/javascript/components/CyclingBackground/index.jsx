import React from 'react';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';

const CyclingBackground = ({ bgPath, eventBgPath }) => {
  const [isSeasonView] = useIsSeasonView();

  return (
    <div className="cycling-background" style={{ backgroundImage: `url('${isSeasonView ? bgPath : eventBgPath}')` }} />
  );
};

export default CyclingBackground;
