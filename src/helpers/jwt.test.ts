import { parseJwt } from './jwt';

describe('testing jwt funcs', () => {
  it('parseJwt should return exacts properties', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const current = parseJwt(token);
    const expected = {
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    };
    expect(JSON.parse(current)).toEqual(expected);
  });
});
