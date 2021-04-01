export interface InitialValues {}

export const User = {
  isSignedIn: null,
};

export const initialValues = {
  user: User,
  userDoc: {},
  collections: [],
  tags: [],
  sync: {
    done: false,
    syncing: {},
  },
};

export default initialValues;
