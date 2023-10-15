import * as yup from 'yup';
import { ValidationMessages } from '../constants';

export const EMAIL_MAX = 50;
const numberRegex = /^\d{6}$/;
const numberFrontRegex = /^\d{2}-\d{2}-\d{2}$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailSchema = yup
  .string()
  .matches(emailRegex, {
    message: ValidationMessages.invalidEmail,
    excludeEmptyString: true,
  })
  .required(ValidationMessages.emailRequired)
  .typeError(ValidationMessages.stringRequired)
  .max(EMAIL_MAX, ValidationMessages.emailMax);

export const numberSchema = yup
  .string()
  .matches(numberRegex, {
    message: ValidationMessages.invalidNumber,
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

export const numberFrontSchema = yup
  .string()
  .matches(numberFrontRegex, {
    message: ValidationMessages.invalidNumber,
    excludeEmptyString: true,
  })
  .typeError(ValidationMessages.stringRequired);
