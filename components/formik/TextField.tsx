import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';

import { useField } from 'formik';

type TextFieldProps<TValues, TName extends keyof TValues> = Omit<
  MUITextFieldProps,
  'value' | 'onChange' | 'error' | 'helperText'
> & {
  name: TValues[TName] extends string ? TName : never;
};

const TextField = <TValues, TName extends keyof TValues>(props: TextFieldProps<TValues, TName>) => {
  const { name } = props;

  const [{ value, onChange, onBlur }, { touched, error }] = useField(name);

  return (
    <MUITextField
      {...props}
      value={value}
      error={!!error}
      helperText={touched && error?.toString()}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export { TextField };
