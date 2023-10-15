import * as yup from 'yup';
import { ValidationMessages } from '../constants';

export const EMAIL_MAX = 50;
const numberRegex = /\d{6}/gi;

export const emailSchema = yup
  .string()
  .email(ValidationMessages.invalidEmail)
  .required(ValidationMessages.emailRequired)
  .typeError(ValidationMessages.stringRequired)
  .max(EMAIL_MAX, ValidationMessages.emailMax);

export const numberSchema = yup
  .string()
  .matches(numberRegex, {
    message: ValidationMessages.invalidNumver,
    excludeEmptyString: true,
  })
  .typeError(ValidationMessages.stringRequired);

export const findRequestBodySchema = yup
  .object()
  .shape({
    email: emailSchema,
    number: numberSchema,
  })
  .noUnknown(true)
  .required();
