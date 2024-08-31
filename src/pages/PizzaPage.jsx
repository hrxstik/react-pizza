import React from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

const PizzaPage = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://66bc4f4f24da2de7ff69f4a8.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка, такой пиццы не существует');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza)
    return (
      <div className="container">
        <h2>Загрузка...</h2>
      </div>
    );
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h2>{pizza.price} ₽</h2>
    </div>
  );
};

export default PizzaPage;
