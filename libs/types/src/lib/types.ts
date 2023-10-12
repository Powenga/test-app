import { Request } from 'express';
import { Query, ParamsDictionary } from 'express-serve-static-core';

export interface ITypedRequest<P extends ParamsDictionary, B, Q extends Query>
  extends Request {
  params: P;
  body: B;
  query: Q;
}
