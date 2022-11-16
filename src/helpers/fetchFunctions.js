const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const URL2 = 'https://api.mercadolibre.com/items/';

export const fetchProduct = async (product) => {
  if (!product) {
    throw new Error('ID não informado');
  }
  const returno = await fetch(URL2 + product);
  const data = returno.json();
  return data;
};

export const fetchProductsList = async (produto) => {
  if (!produto) {
    throw new Error('Termo de busca não informado');
  }
  try {
    const retorno = await fetch(URL + produto);
    const data = await retorno.json();
    return data.results;
  } catch (erro) {
    return erro.message;
  }
};
