import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {updateToken} from '../../redux/reducers/User';
import store from '../../redux/store';

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential | errorType> => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: name});
    return user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return {error: 'Email is already registered'};
    } else if (error.code === 'auth/invalid-email') {
      return {error: 'Email address is invalid'};
    } else {
      return {error: 'Something went wrong with your request'};
    }
  }
};

type loginDataType = {
  status: boolean;
  data: {
    displayName: string | null;
    email: string | null;
    token: string;
  };
};

type errorType = {
  error: string;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<loginDataType | errorType> => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();

    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error: any) {
    if (error.code === 'auth/invalid-email') {
      return {error: 'Email address is invalid'};
    } else if (
      error.code === 'auth/invalid-credential' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/user-not-found'
    ) {
      return {error: "You've entered invalid credentials"};
    } else {
      return {error: 'Something went wrong with your request'};
    }
  }
};

export const logout = async () => {
  await auth().signOut();
};

export const checkToken = async () => {
  try {
    let response = await auth().currentUser?.getIdToken(true);
    store.dispatch(updateToken(response));
    return response;
  } catch (e) {
    return e;
  }
};
