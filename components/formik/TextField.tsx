import MUITextField, { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import { useFormikContext } from 'formik';

type TextFieldProps<TValues, TName extends keyof TValues> = Omit<
  MUITextFieldProps,
  'value' | 'onChange' | 'error' | 'helperText'
> & {
  name: TValues[TName] extends string ? TName : never;
};

const TextField = <TValues, TName extends keyof TValues>(props: TextFieldProps<TValues, TName>) => {
  const { name } = props;

  const { values, errors, touched, handleChange, handleBlur } = useFormikContext<TValues>();

  return (
    <MUITextField
      {...props}
      value={values[name]}
      error={!!errors[name]}
      helperText={touched[name] && errors[name]?.toString()}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export { TextField };
