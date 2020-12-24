export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const signIn = (user: any) => {
  return { type: SIGN_IN, value: user };
};

export const signOut = () => {
  return { type: SIGN_OUT, value: undefined };
};
