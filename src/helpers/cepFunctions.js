export const getAddress = async (endpoint) => {
  const URL1 = `https://cep.awesomeapi.com.br/json/${endpoint}`;
  const URL2 = `https://brasilapi.com.br/api/cep/v2/${endpoint}`;
  const fetch1 = await fetch(URL1);
  const fetch2 = await fetch(URL2);
  const response = await Promise.any([fetch1, fetch2]);
  const data = await response.json();
  console.table(data);
  return data;
};

export const searchCep = async () => {
  const cep = document.querySelector('.cep-input').value;
  const display = document.querySelector('.cart__address');
  getAddress(cep)
    .then((data) => {
      const Rua = data.address;
      const Bairro = data.district;
      const Cidade = data.city;
      const Estado = data.state;
      display.innerText = `${Rua} - ${Bairro} - ${Cidade} - ${Estado}`;
    })
    .catch(() => { display.innerText = 'CEP não encontrado'; });
};
