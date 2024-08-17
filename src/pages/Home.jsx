import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setcategoryId] = React.useState(1);
  const [sortType, setSortType] = React.useState({ name: 'популярности', value: 'rating' });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://66bc4f4f24da2de7ff69f4a8.mockapi.io/items?${
        categoryId !== 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.value.replace('-', '')}&order=${
        sortType.value.includes('-') ? 'asc' : 'desc'
      }`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={(index) => setcategoryId(index)} />
        <Sort sortParams={sortType} onChange={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
