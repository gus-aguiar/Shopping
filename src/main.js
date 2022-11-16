import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = document.querySelector('.products');
const computador = await fetchProductsList('computador');
computador.forEach((element) => {
  const data = createProductElement(element);
  products.appendChild(data);
});
