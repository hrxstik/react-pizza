import React from 'react';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const [inputValue, setInputValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 300),
    [],
  );

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.root}
        placeholder="Найти пиццу"
        value={inputValue}
      />
      {inputValue && (
        <svg
          onClick={onClickClear}
          className={styles.cross}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
