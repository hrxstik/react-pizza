import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.value;

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    setIsLoading(true);
    // fetch(
    //   `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/items?page=${currentPage}&limit=4&${
    //     categoryId !== 0 ? `category=${categoryId}` : ''
    //   }&sortBy=${sortType.replace('-', '')}&order=${sortType.includes('-') ? 'asc' : 'desc'}${
    //     searchValue ? `search=${searchValue}` : ''
    //   }`,
    // );
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });
    axios
      .get(
        `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId !== 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.replace('-', '')}&order=${sortType.includes('-') ? 'asc' : 'desc'}${
          searchValue ? `search=${searchValue}` : ''
        }`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  const pizzas = items
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue)) {
    //     return true;
    //   }

    //   return false;
    // })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={(index) => onChangeCategory(index)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
