import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort } from '../redux/slices/filterSlice';

type SortObj = {
  name: string;
  value: string;
};

export const list: SortObj[] = [
  { name: 'популярности (по убыванию)', value: 'rating' },
  { name: 'популярности (по возрастанию)', value: '-rating' },
  { name: 'цене (по убыванию)', value: 'price' },
  { name: 'цене (по возрастанию)', value: '-price' },
  { name: 'алфавиту (с начала)', value: 'title' },
  { name: 'алфавиту (с конца)', value: '-title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState(false);

  const onClickListItem = (obj: SortObj) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleOuterClick = (event: MouseEvent) => {
      if (!event.composedPath().includes(sortRef.current!)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleOuterClick);

    return () => {
      document.body.removeEventListener('click', handleOuterClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && ( //условный рендеринг
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={sort.value === obj.value ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
