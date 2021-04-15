export interface Notification {
  id: string;
  severity: 'warning' | 'error' | 'info' | 'success';
  content: string | Element | JSX.Element;
  title?: string;
  action?: Element | JSX.Element;
  onClose?: () => void | undefined;
  duration?: number;
  icon?: Element | JSX.Element;
  closeText?: string;
}

export interface InitialValues {
  notifications: Notification[];
  firstVisit: boolean;
}

export const initialValues: InitialValues = {
  notifications: [],
  firstVisit: false,
};

export default initialValues;
