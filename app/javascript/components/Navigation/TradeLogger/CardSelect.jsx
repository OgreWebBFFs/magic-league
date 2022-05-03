import React, {useState} from 'react';
import { useDebounce } from 'react-use';
import Select from 'react-select';
import xhrRequest from '../../../helpers/xhr-request';

const searchCards = async (query) => (await xhrRequest({
  url: `/cards?query=${query}`,
  options: {
    method: 'GET'
  }
})).data;

const CardSelect = ({ onUpdate }) => {
  const [cardOptions, setCardOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [uniqify, setUniqify] = useState(0);
  
  const handleInputChange = (value) => {
    if (value.length < 3){
      setCardOptions([]);
    }
    setInputValue(value);
  }

  const handleSelectChange = (options) => {
    setUniqify(uniqify + 1);
    onUpdate(options);
  }

  useDebounce(async () => {
    if(inputValue.length > 2)
      setCardOptions((await searchCards(inputValue)).map(card => ({
        value: `${card.id}#${uniqify}`,
        label: card.attributes.name,
        card
      })));
  }, 800, [inputValue]);

  return (
    <Select
      isMulti
      options={cardOptions}
      onChange={handleSelectChange}
      onInputChange={handleInputChange}
      className={"trade-logger__card-select"}
      form={"trade-form"}
    />
  )
}

export default CardSelect;

