import firebase from 'firebase-admin';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const PASSWORD_DUMMY = '123456';

const firebaseConfig = {
  projectId: 'node-firebase-7c462',
  clientEmail: 'firebase-adminsdk-o20zu@node-firebase-7c462.iam.gserviceaccount.com',
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const firebaseAdmin: any = firebase.initializeApp({
  credential: firebase.credential.cert(firebaseConfig),
});

export const hasValidToken = (token: string | undefined) =>
  firebaseAdmin
    .auth()
    .verifyIdToken(token || '')
    .then(() => true)
    .catch(() => false);

export const generateToken = async (inputEmail?: string) => {
  try {
    const envTestEmail = process.env.TEST_EMAIL as string;
    const email = inputEmail || envTestEmail;

    initializeApp({ apiKey: 'AIzaSyBTriDoJwJ4MrM8e-_kNeRbKvtWBq0q3w8' });
    let user = await firebaseAdmin.auth().getUserByEmail(email);
    if (!user) {
      user = await firebaseAdmin.auth().createUser({ email });
    }
    const token = await firebaseAdmin.auth().createCustomToken(user.uid);
    const auth = getAuth();
    const credentials = await signInWithCustomToken(auth, token);
    return credentials.user.getIdToken();
  } catch (e) {
    return '';
  }
};

export const generateBearerToken = async (inputEmail?: string) => {
  const tokenGenerated = await generateToken(inputEmail);
  return `Bearer ${tokenGenerated}`;
};

export const generateLinkForEmail = async (email: string) =>
  firebaseAdmin.auth().generateEmailVerificationLink(email);

export const findFirebaseUserByEmail = async (email: string) => {
  try {
    const userFound = await firebaseAdmin.auth().getUserByEmail(email);
    return userFound;
  } catch (error) {
    return null;
  }
};

export const getFirebasePasswordResetLink = async (email: string) => {
  try {
    const resetLink = await firebaseAdmin.auth().generatePasswordResetLink(email);
    return resetLink;
  } catch {
    return null;
  }
};

export const createFirebaseUserByEmail = async (email: string, password?: string) => {
  try {
    const firebaseUserCreated = await firebaseAdmin.auth().createUser({
      email,
      password: password || PASSWORD_DUMMY,
    });
    return firebaseUserCreated;
  } catch (e) {
    console.log(e);
    return null;
  }
};
