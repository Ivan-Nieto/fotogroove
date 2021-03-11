import { useFormContext } from '../context/Context';

type Type = 'SIGN_IN' | 'SIGN_OUT';

const useStoreAction = () => {
  const { dispatch } = useFormContext();
  const runAction = async (type: Type, payload: any) => {
    switch (type) {
      case 'SIGN_IN':
        dispatch({ type: 'SIGN_IN', value: payload });
        break;
      case 'SIGN_OUT':
        dispatch({ type: 'SIGN_OUT', value: {} });
        break;
      default:
    }
  };

  return runAction;
};

export default useStoreAction;
