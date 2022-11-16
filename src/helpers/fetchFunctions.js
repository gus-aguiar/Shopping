export const fetchProduct = async (produto) => {
  if (!produto) {
    throw new Error('Termo de busca não informado');
  } else {
    const retorno = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=$${produto}`);
    console.log(retorno);
  }
};

export const fetchProductsList = () => {
  // seu código aqui
};
