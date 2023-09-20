import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import xhrRequest from '../../../helpers/xhr-request';
import { CardImage } from '../../CardGrid';
import Button from '../../Button';
import Toggle from '../../Toggle';
import Modal from '../../Modal';



const PrizeEditor = ({ prize, onClose }) => {
  const [prints, setPrints] = useState(['https://placehold.co/488x680?text=Loading...']);
  const [isFoiled, setIsFoiled] = useState(prize.foiled);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const fetchPrintOptions = async () => {
      const printResults = await xhrRequest({
        url: `/cards/${prize.id}/prints`,
      });
      setPrints(printResults);
    };
    fetchPrintOptions();
  }, []);

  return (
    <Modal onClose={() => onClose({
      ...prize,
      image: prints[pos],
      foiled: isFoiled,
    })}
    >
      <div className="draffle-edit__print-selector" style={{ marginLeft: `${25 - (pos * 35)}%` }}>
        {prints.map((print, i) => (
          <div
            className={classNames(
              'draffle-edit__print-selector--print-option foiled',
              { active: i === pos },
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
    </Modal>
  );
};

export default PrizeEditor;
