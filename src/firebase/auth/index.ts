import { auth } from "../init";

export const emailSignIn = async (email: string, password: string) => {
  const response: any = await auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      return { error: true };
    });

  return { error: response?.error };
};

export const signOut = () => auth.signOut();
