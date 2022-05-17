import { useMemo } from 'react';
import { TFunction, useTranslation } from 'react-i18next';

import { FormikConfig } from 'formik';

type ValidationSchemaBulder<TValues> = (t: TFunction<'translations', undefined>) => FormikConfig<TValues>['validationSchema'];

const useValidationSchema = <TValues>(builder: ValidationSchemaBulder<TValues>) => {
  const { t } = useTranslation();
  return useMemo(() => builder(t), [builder, t]);
};

export { useValidationSchema };
export type { ValidationSchemaBulder };