import { removeLastChartSlash, removeQueryParams, setWhitelist } from './middleware';

describe('testing middleware funcs', () => {
  it('should match and trigger next function', async () => {
    const list = [{ url: '/v1/warehouses', method: 'GET' }];
    const middleWareFunction = jest.fn();
    const req: any = {
      url: '/v1/warehouses',
      method: 'GET',
    };
    const res: any = {};
    const next: any = jest.fn();

    setWhitelist(list, middleWareFunction)(req, res, next);
    expect(middleWareFunction).toBeCalledTimes(0);
    expect(next).toBeCalledTimes(1);
  });

  it('should not match and trigger middleware input function', async () => {
    const list = [{ url: '/v1/warehouses', method: 'GET' }];
    const middleWareFunction = jest.fn();
    const req: any = {
      url: '/v1/warehouses',
      method: 'POST',
    };
    const res: any = {};
    const next: any = jest.fn();

    setWhitelist(list, middleWareFunction)(req, res, next);
    expect(middleWareFunction).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  it('should return a url without slash', () => {
    const input = '/v1/warehouses/';
    const result = removeLastChartSlash(input);
    expect(result).toBe('/v1/warehouses');
  });

  it('should return a url without query params', () => {
    const input = '/v1/warehouses?page=1&page_size=10';
    const result = removeQueryParams(input);
    expect(result).toBe('/v1/warehouses');
  });
});
