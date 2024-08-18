import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setcategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', value: 'rating' });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId !== 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.value.replace('-', '')}&order=${
        sortType.value.includes('-') ? 'asc' : 'desc'
      }${searchValue ? `search=${searchValue}` : ''}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
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
        <Categories value={categoryId} onChange={(index) => setcategoryId(index)} />
        <Sort sortParams={sortType} onChange={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
