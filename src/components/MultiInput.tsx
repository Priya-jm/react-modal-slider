import { useState } from 'react';

import CreatableSelect from 'react-select/creatable';
import { validateEthAddress } from '../utils';

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

const customStyles = {
  container: () => ({
    padding: '14px 27px',
  }),
};

export const MultiInput = (props: any) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  // const [value, setValue] = useState <any>([]);

  const handleChange = (value: any, actionMeta: any) => {
    // console.group("Value Changed");
    // console.log(value);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
    props.setValue(value);
  };
  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };
  const handleKeyDown = (event: any) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.groupEnd();
        setInputValue('');

        if (validateEthAddress(inputValue)) {
          setError('');
          const updatedVal = [...props.value, createOption(inputValue)];
          props.setValue(updatedVal);
        } else {
          setError('Eth Address not valid');
          const updatedVal = [...props.value];
          props.setValue(updatedVal);
        }
        event.preventDefault();
    }
  };
  return (
    <div className="multiWrapper">
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={props.label}
        value={props.value}
        styles={customStyles}
        // className={props.className}
      />
      {error !== '' && (
        <div className='errorInput'> Eth Address was not valid</div>
      )}
    </div>
  );
};

export default MultiInput;
