import React, { useState } from 'react';
import classNames from 'classnames';
import { Cell } from '../../Table';
import Button from '../../Button';
import xhrRequest from '../../../helpers/xhr-request';

const DescriptionCell = ({ children }) => <Cell className="objectives-manager__description-cell">{children}</Cell>;
const IntCell = ({ children }) => <Cell className="objectives-manager__int-cell">{children}</Cell>;
const ControlsCell = ({ children }) => <Cell className="objectives-manager__controls-cell">{children}</Cell>;

const ObjectiveManagerRow = ({ id, description: initDescription, value: initValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initDescription);
  const [value, setValue] = useState(initValue);

  const submitObjective = async () => {
    try {
      await xhrRequest({
        url: `/admin/objectives/${id}`,
        options: {
          method: 'PUT',
          body: JSON.stringify({ description, value }),
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = () => {
    setDescription(initDescription);
    setValue(initValue);
    setIsEditing(false);
  };

  const destroyObjective = async () => {
    try {
      await xhrRequest({
        url: `/admin/objectives/${id}`,
        options: {
          method: 'DELETE',
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <IntCell>{id}</IntCell>
      {isEditing ? (
        <>
          <DescriptionCell>
            <input type="text" defaultValue={description} onChange={(e) => setDescription(e.target.value)}/>
          </DescriptionCell>
          <IntCell>
            <input type="number" min="1" defaultValue={value} onChange={(e) => setValue(e.target.value)} />
          </IntCell>
        </>
      ) : (
        <>
          <DescriptionCell>{description}</DescriptionCell>
          <IntCell>{value}</IntCell>
        </>
      )}
      <ControlsCell>
        <Button
          className={classNames({
            'objectives-manager__controls-cell--edit': !isEditing,
            'objectives-manager__controls-cell--submit': isEditing,
          })}
          onClick={() => (isEditing ? submitObjective() : setIsEditing(true))}
        >
          <i className={classNames('fa', { 'fa-pencil': !isEditing, 'fa-check': isEditing })} />
        </Button>
        <Button className="objectives-manager__controls-cell--destroy" onClick={() => (isEditing ? cancelEdit() : destroyObjective())}>
          <i className="fas fa-times" />
        </Button>
      </ControlsCell>
    </>
  );
};

export default ObjectiveManagerRow;
