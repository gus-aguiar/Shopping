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

let contador = 0;
products.addEventListener('click', async (elem) => {
  const price = elem.target.parentNode.lastChild.previousSibling.lastChild.textContent;
  const preco = parseFloat(price);
  contador += preco;
  const total = document.querySelector('.total-price');
  total.innerHTML = contador;
});

cart.addEventListener('click', (para) => {
  const priceTwo = para
    .target.parentNode.lastChild.previousSibling.lastChild.lastChild.textContent;
  const precoTwo = parseFloat(priceTwo).toFixed(2);
  contador -= precoTwo;
  const total = document.querySelector('.total-price');
  total.innerHTML = contador;
});

window.onload = async () => {
  getSavedCartIDs().map(async (element) => {
    const elementos = await fetchProduct(element);
    Promise.all(cart.appendChild(createCartProductElement(elementos)));
  });
};

await createProducts('computador');
