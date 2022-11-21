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

const reduze = (elem) => {
  const reduce = elem.reduce((acc, cur) => acc + cur);
  return reduce;
};
const allPrice = async () => {
  const pega = getSavedCartIDs();
  const precoArray = [];
  pega.forEach(async (param) => {
    const { price } = await fetchProduct(param);
    precoArray.push(price);
    total.innerHTML = reduze(precoArray);
  });
};
products.addEventListener('click', async (param) => {
  const nomeClasse = param.target.className;
  if (nomeClasse === 'product__add') {
    const ID = param.target.parentNode.firstChild.innerText;
    saveCartID(ID);
    const producto = await fetchProduct(ID);
    cart.appendChild(createCartProductElement(producto));
    allPrice();
  }
});

cart.addEventListener('click', (para) => {
  const priceTwo = para.target.parentNode.lastChild.lastChild.innerHTML;
  const priceTwoNumber = Number(priceTwo);
  const precoTwo = Number(total.innerHTML);
  const contadorSoma = precoTwo - priceTwoNumber;
  total.innerHTML = '';
  total.innerHTML = contadorSoma.toFixed(2);
});

window.onload = async () => {
  getSavedCartIDs().map(async (element) => {
    const elementos = await fetchProduct(element);
    Promise.all([cart.appendChild(createCartProductElement(elementos))]);
  });
  allPrice();
};

await createProducts('computador');
