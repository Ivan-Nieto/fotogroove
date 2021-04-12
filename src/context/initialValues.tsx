export interface InitialValues {}

export interface User {
  isSignedIn: boolean;
  [key: string]: any;
}

export const user = {
  isSignedIn: null,
};

export const initialValues = {
  user,
  userDoc: {},
  collections: [],
  tags: [],
  sync: {
    done: false,
    syncing: {},
  },
};

export default initialValues;
