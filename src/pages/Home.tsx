import React from 'react';

import Categories from '../components/Categories';
import SortPopUp from '../components/SortPopUp';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { list } from '../components/SortPopUp';

import qs from 'qs';

import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas, selectPizzaSlice } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaSlice);

  const sortType = sort.value;

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.value === params.sortBy.value);

      dispatch(
        setFilters({
          searchValue: params.searchQuery,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: params.sortBy,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const getPizzas = async () => {
    const sortType = sort.value.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const searchQuery = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy: sort,
        order,
        category,
        searchQuery,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (!isSearch.current || isMounted.current) {
      getPizzas();
    }
    isSearch.current = true;
  }, [categoryId, sort.value, searchValue, currentPage]);

  const pizzas = items.map((pizza: any) => (
    <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
      <PizzaBlock {...pizza} />
    </Link>
  ));
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index: number) => onChangeCategory(index)}
        />
        <SortPopUp />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-text">
          <h1>Ошибка при получении данных 😐</h1>
          <p>Попробуйте выключить и включить утюг.</p>
        </div>
      ) : (
        <>
          <div className="content__items">{status === 'pending' ? skeletons : pizzas}</div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
};

export default Home;
