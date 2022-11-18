import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const cart = document.querySelector('.cart__products');
const total = document.querySelector('.total-price');

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

const contador = [];

products.addEventListener('click', async (elem) => {
  total.innerHTML = 0;
  const price = elem.target.parentNode.lastChild.previousSibling.lastChild.textContent;
  const preco = parseFloat(price);
  contador.push(preco);
  const totalTwo = JSON.stringify(contador);
  localStorage.setItem('preco', totalTwo);
  const contadorSoma = contador.reduce((acc, cur) => (acc + cur));
  total.innerHTML = contadorSoma.toFixed(2);
});

cart.addEventListener('click', (para) => {
  total.innerHTML = 0;
  const priceTwo = para
    .target.parentNode.lastChild.previousSibling.lastChild.lastChild.textContent;
  const precoTwo = parseFloat(priceTwo).toFixed(2);
  contador.push((precoTwo * (-1)));
  const totalTwo = JSON.stringify(contador);
  localStorage.setItem('preco', totalTwo);
  const contadorSoma = contador.reduce((acc, cur) => (acc + cur));
  total.innerHTML = contadorSoma;
});

window.onload = async () => {
  getSavedCartIDs().map(async (element) => {
    const elementos = await fetchProduct(element);
    Promise.all(cart.appendChild(createCartProductElement(elementos)));
  });
  if (localStorage.getItem('preco')) {
    total.innerHTML = JSON.parse(localStorage.getItem('preco'));
  }
};

await createProducts('computador');
