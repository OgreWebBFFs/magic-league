/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ActiveObjectives, CompletedObjectives } from './Objectives';

const eventTabs = (edit) => ({
  ...(edit ? {
    active: {
      view: (props) => <ActiveObjectives {...props} />,
      notification: () => false,
      actions: ['reroll'],
    },
  } : {}),
  complete: {
    view: (props) => <CompletedObjectives {...props} />,
    notification: () => false,
    actions: [],
  },
});

export default eventTabs;
