import { Router } from 'express';
import product from './product';
const routes = Router();
routes.use('/ProductAdd', product);
export { routes };