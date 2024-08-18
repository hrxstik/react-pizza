import React from 'react';

import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div>
      <input
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.root}
        placeholder="Найти пиццу"
        value={searchValue}
      />
      {searchValue && (
        <svg
          onClick={() => setSearchValue('')}
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
