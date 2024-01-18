import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  try {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{10,}$/;
    if (regex.test(password)) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    }
    throw new Error(
      'La contraseña no cumple con los requisitos, debe de contener al menos una mayúscula, minúscula, un numero y un caracter',
    );
  } catch (error) {
    throw new Error(`Error al encriptar la contraseña: ${error.message}`);
  }
};

export const decryptPassword = (password: string, storedHashedPassword: string) => {
  return bcrypt.compareSync(password, storedHashedPassword);
};
