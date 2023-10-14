import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import xhrRequest from '../../../../helpers/xhr-request';
import { CardImage } from '../../../CardGrid';
import Button from '../../../Button';
import Toggle from '../../../Toggle';

const PrintPicker = ({
  prize, imgHeight, imgWidth, onSave, onClose,
}) => {
  const [foiled, setFoiled] = useState(prize.foiled);
  const [pos, setPos] = useState(0);
  const [prints, setPrints] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchPrintOptions = async () => {
      const printResults = await xhrRequest({
        url: `/cards/${prize.card_id}/prints`,
      });
      setPrints(printResults);
      setPos(printResults.indexOf(prize.image));

      setTimeout(() => setAnimate(true), 100);
    };
    fetchPrintOptions();
  }, []);

  return (
    <>
      <div style={{
        width: imgWidth, height: imgHeight, overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}
      >
        <div className={classNames('edit-prizes__print-selector', { animate })} style={{ marginLeft: `${12.5 - (pos * 35)}%` }}>
          {prints.map((print, i) => (
            <div
              className={classNames(
                'edit-prizes__print-selector--print-option foiled',
                {
                  active: i === pos,
                  animate,
                },
              )}
            >
              <CardImage
                name={`alt art ${i + 1}`}
                imageUrl={print}
                foiled={foiled}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button onClick={() => setPos(pos > 0 ? pos - 1 : pos)} disabled={animate && pos === 0}>
            <i className="fas fa-chevron-left" />
          </Button>
          <Toggle
            name={`foiled--${prize.id}`}
            checked={foiled}
            onClick={() => setFoiled(!foiled)}
            options={['Foil', '']}
          />
          <Button
            onClick={() => setPos(pos < prints.length - 1 ? pos + 1 : pos)}
            disabled={animate && pos === prints.length - 1}
          >
            <i className="fas fa-chevron-right" />
          </Button>
        </div>
      </div>
      <Button
        onClick={() => {
          onSave({ foiled, image: prints[pos] });
          onClose();
        }}
      >
        <i className="fas fa-check" />
        SAVE
      </Button>
      <Button onClick={() => onClose()}>
        <i className="fas fa-times" />
        CANCEL
      </Button>
    </>
  );
};

export default PrintPicker;
