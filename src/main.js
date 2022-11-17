import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const cart = document.querySelector('.cart__products');

const criaLoading = () => {
  const divCarregando = document.querySelector('#carregando');
  const textoCarregamento = document.createElement('h1');
  textoCarregamento.className = 'loading';
  textoCarregamento.innerText = 'carregando...';
  divCarregando.appendChild(textoCarregamento);
};
const apagaLoading = () => {
  const textoLoading = document.querySelector('.loading');
  textoLoading.remove();
};
const createErrorText = () => {
  const productos = document.querySelector('.products');
  const textoErro = document.createElement('h1');
  textoErro.className = 'error';
  textoErro.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  productos.appendChild(textoErro);
};

const createProducts = async (param) => {
  criaLoading();
  try {
    const computador = await fetchProductsList(param);
    computador.forEach((element) => {
      products.appendChild(createProductElement(element));
    });
    apagaLoading();
  } catch (error) {
    return createErrorText();
  }
};
products.addEventListener('click', async (param) => {
  const ID = param.target.parentNode.firstChild.innerText;
  saveCartID(ID);
  const producto = await fetchProduct(ID);
  cart.appendChild(createCartProductElement(producto));
});
window.onload = async () => {
  getSavedCartIDs().map(async (element) => {
    const elementos = await fetchProduct(element);
    Promise.all(cart.appendChild(createCartProductElement(elementos)));
  });
};

await createProducts('computador');
