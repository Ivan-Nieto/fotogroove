import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Input from '../Input/Input';
import Error from './Error';

interface FieldProps {
  type: 'text' | 'number' | 'email' | string;
  validation: any;
  initialValue: string | number;
  key: string;
  label?: string;
  disabled?: boolean;
  component?: any;
}

interface Props {
  direction?: 'vertical' | 'horizontal';
  fields: FieldProps[];
  onSubmit: any;
  formName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const RenderForm = (props: Props) => {
  const theme = useTheme();
  const { item } = useStyles(theme);

  const getConfig = (fieldName: string) => {
    let tempObj: Record<string, any> = {};

    props.fields.forEach((e: Record<string, any>) => {
      tempObj[e.key] = e[fieldName];
    });

    return tempObj;
  };

  // Generate initialValues
  const initialValues = getConfig('initialValue');

  // Generate validation schema
  const validationSchema = Yup.object().shape(getConfig('validation'));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }: any) => (
        <Form id={props.formName}>
          {props.fields.map((e) => (
            <div className={item}>
              <Field
                key={e.key}
                id={e.key}
                name={e.key}
                type={e.type}
                label={e.label}
                variant='outlined'
                as={e.component || Input}
              />
              {errors[e.key] && touched[e.key] && (
                <Error error={errors[e.key] || 'Invalid'} />
              )}
            </div>
          ))}
        </Form>
      )}
    </Formik>
  );
};

export default RenderForm;
