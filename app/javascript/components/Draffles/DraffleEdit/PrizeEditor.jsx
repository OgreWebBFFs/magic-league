import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import xhrRequest from '../../../helpers/xhr-request';
import { CardImage } from '../../CardGrid';
import Button from '../../Button';
import Toggle from '../../Toggle';
import Modal from '../../Modal';

const PrizeEditor = ({ prize, onClose }) => {
  const [prints, setPrints] = useState(['https://placehold.co/488x680?text=Loading...', 'https://placehold.co/488x680?text=Loading...', 'https://placehold.co/488x680?text=Loading...']);
  const [isFoiled, setIsFoiled] = useState(prize.foiled);
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchPrintOptions = async () => {
    const printResults = await xhrRequest({
      url: `/cards/${prize.card_id}/prints`,
    });
    setPrints(printResults);
    setPos(printResults.indexOf(prize.image));
    setIsEditing(true);
    setTimeout(() => setAnimate(true), 100);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div>

        {!isEditing ? (
          <CardImage
            key={`${prize.name}_${prize.id}`}
            name={prize.name}
            imageUrl={prize.image}
            foiled={prize.foiled}
          />
        ) : (
          <>
            <div className={classNames('draffle-edit__print-selector', { animate })} style={{ marginLeft: `${25 - (pos * 35)}%` }}>
              {prints.map((print, i) => (
                <div
                  className={classNames(
                    'draffle-edit__print-selector--print-option foiled',
                    {
                      active: i === pos,
                      animate,
                    },
                  )}
                >
                  <CardImage
                    name={`alt art ${i + 1}`}
                    imageUrl={print}
                    foiled={isFoiled}
                  />
                </div>
              ))}
            </div>
            <Button onClick={() => setPos(pos < prints.length - 1 ? pos + 1 : pos)}>+</Button>
            <Button onClick={() => setPos(pos > 0 ? pos - 1 : pos)}>-</Button>
            <Toggle
              name="foiled"
              checked={isFoiled}
              onClick={() => setIsFoiled(!isFoiled)}
              options={['Foil', 'Non-Foil']}
            />
          </>
        )}
      </div>
      <Button onClick={() => {
        if (!isEditing) {
          fetchPrintOptions();
        } else {
          setIsEditing(false);
        }
      }}
      >
        <i className="fas fa-edit" />
      </Button>
      <Button>
        <i className="fas fa-trash-alt" />
      </Button>
    </div>
  );
};

export default PrizeEditor;
