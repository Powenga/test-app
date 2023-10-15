import * as yup from 'yup';
import { ITypedRequest } from '@test-app/types';
import { NextFunction, Response } from 'express';
import { Query, ParamsDictionary } from 'express-serve-static-core';
import BadRequestError from '../utils/errors/bad-request';
import { findRequestBodySchema } from '@test-app/validation';

type TSchemas = {
  paramsSchema?: yup.AnyObjectSchema;
  bodySchema?: yup.AnyObjectSchema;
  querySchema?: yup.AnyObjectSchema;
  cookiesSchema?: yup.AnyObjectSchema;
};

export const validate =
  <P extends ParamsDictionary, B, Q extends Query>({
    paramsSchema,
    bodySchema,
    querySchema,
    cookiesSchema,
  }: TSchemas) =>
  async (req: ITypedRequest<P, B, Q>, res: Response, next: NextFunction) => {
    try {
      if (paramsSchema) {
        req.params = await paramsSchema.validate(req.params);
      }
      if (bodySchema) {
        req.body = await bodySchema.validate(req.body);
      }
      if (querySchema) {
        req.query = await querySchema.validate(req.query);
      }
      if (cookiesSchema) {
        req.cookies = await cookiesSchema.validate(req.cookies);
      }
      return next();
    } catch (error) {
      next(new BadRequestError(error.message));
    }
  };

export const validateFindRequest = validate<
  never,
  yup.InferType<typeof findRequestBodySchema>,
  never
>({
  bodySchema: findRequestBodySchema,
});
