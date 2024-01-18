import { encryptPassword, decryptPassword } from './encryptPassword';

describe('Test de encriptación y desencriptación de contraseñas', () => {
  test('Debería encriptar correctamente una contraseña válida', async () => {
    const password = 'TuContraseña123!';
    const hashedPassword = await encryptPassword(password);

    expect(hashedPassword).toBeDefined();
    expect(typeof hashedPassword).toBe('string');
  });

  test('Debería lanzar un error al intentar encriptar una contraseña inválida', async () => {
    const invalidPassword = 'contraseñaInvalida';

    await expect(encryptPassword(invalidPassword)).rejects.toThrow();
  });

  test('Debería verificar correctamente una contraseña encriptada', () => {
    const password = 'TuContraseña123!';
    const hashedPassword = '$2b$10$...';

    const result = decryptPassword(password, hashedPassword);
    expect(result).toBe(false);
  });

  test('Debería devolver falso al verificar una contraseña incorrecta', () => {
    const password = 'ContraseñaIncorrecta';
    const hashedPassword = '$2b$10$...';

    const result = decryptPassword(password, hashedPassword);
    expect(result).toBe(false);
  });
});
