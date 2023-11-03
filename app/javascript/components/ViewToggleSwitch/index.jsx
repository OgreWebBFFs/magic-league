import React from 'react';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';
import Toggle from '../Toggle';

const ViewToggleSwitch = ({
  name,
}) => {
  const isEventActive = false;
  const [isSeasonView, toggleSeasonView] = useIsSeasonView();
  return isEventActive && (
    <Toggle
      name={name}
      clicked={isSeasonView}
      onClick={toggleSeasonView}
      options={['Season', 'Event']}
    />
  );
};

export default ViewToggleSwitch;
