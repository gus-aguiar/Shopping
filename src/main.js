import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');

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

await createProducts('computador');
