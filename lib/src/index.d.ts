import { Application } from 'express';
import { Options } from './interfaces';
declare const swaggerMock: (app: Application, { urls, propertyResolver, resultResolver, watchPaths }?: Options) => void;
export default swaggerMock;
