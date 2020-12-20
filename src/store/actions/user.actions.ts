export const SIGN_IN = "SIGN_IN";

export const signIn = (user: any) => {
  return { type: SIGN_IN, value: user };
};
