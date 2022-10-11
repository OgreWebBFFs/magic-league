import React from 'react';
import useIsSeasonView from '../../helpers/hooks/use-is-season-view';

const ViewToggleSwitch = ({
  name,
}) => {
  const isEventActive = false;
  const [isSeasonView, toggleSeasonView] = useIsSeasonView();
  return isEventActive && (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        checked={isSeasonView}
        onClick={toggleSeasonView}
        name={name}
        id={name}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" data-a="Season" data-b="Event" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ViewToggleSwitch;
