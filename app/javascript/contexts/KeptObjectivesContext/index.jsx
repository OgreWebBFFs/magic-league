import React, { useState, useMemo } from 'react';

const KeptObjectivesContext = React.createContext();

const KeptObjectivesProvider = ({ children, objectives }) => {
  const initKeptObjectives = objectives
    .filter((objective) => objective.data.attributes.keep)
    .map((objective) => objective.data.attributes.id);

  const [keptObjectives, setKeptObjectives] = useState(initKeptObjectives);

  const toggleKeptObjective = (id) => {
    if (keptObjectives.includes(id)) {
      setKeptObjectives(keptObjectives.filter((objectiveId) => objectiveId !== id));
    } else {
      setKeptObjectives([...keptObjectives, id]);
    }
  };

  const keptContextValues = useMemo(
    () => ({ keptObjectives, toggleKeptObjective }),
    [keptObjectives],
  );

  return (
    <KeptObjectivesContext.Provider value={keptContextValues}>
      {children}
    </KeptObjectivesContext.Provider>
  );
};

export { KeptObjectivesContext, KeptObjectivesProvider };
