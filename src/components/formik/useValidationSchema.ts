import { useMemo } from 'react';
import { TFunction, useTranslation } from 'react-i18next';

import { FormikConfig } from 'formik';

type ValidationSchemaBuilder<TValues> = (
  t: TFunction<'translations', undefined>
) => FormikConfig<TValues>['validationSchema'];

const useValidationSchema = <TValues>(builder: ValidationSchemaBuilder<TValues>) => {
  const { t } = useTranslation();
  return useMemo(() => builder(t), [builder, t]);
};

export { useValidationSchema };
export type { ValidationSchemaBuilder };
