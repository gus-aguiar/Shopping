export const fetchProduct = async () => {

};
const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
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
