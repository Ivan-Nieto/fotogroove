export interface User {
  isSignedIn: boolean | null;
  [key: string]: any;
}

export interface InitialValues {
  user: User;
  userDoc: Record<string, any>;
  collections: Record<string, any>[];
  lists: Record<string, any>[];
  tags: string[];
  sync: { done: boolean; syncing: Record<string, boolean> };
}

export const user = {
  isSignedIn: null,
};

export const initialValues: InitialValues = {
  user,
  userDoc: {},
  collections: [],
  lists: [],
  tags: [],
  sync: {
    done: false,
    syncing: {},
  },
};

export default initialValues;
