import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProduct).toBe('function')
  });
  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProduct("MLB1405519561");
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
});
