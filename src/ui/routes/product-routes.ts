import { Router } from 'express';

import { createProductController } from '../controllers/products/create-product-controller';
import { findProductsController } from '../controllers/products/find-products-controller';
import { findProductController } from '../controllers/products/find-product-by-id-controller';
import { updateProductController } from '../controllers/products/update-product-controller';
import { deleteProductController } from '../controllers/products/delete-product-controller';
import { authenticationMiddleware } from '@ui/middlewares/authentication-middleware';

const productRouter = Router();

productRouter.get('/', findProductsController);

productRouter.get('/:productId', findProductController);

productRouter.post('/', [authenticationMiddleware], createProductController);

productRouter.patch('/:productId', updateProductController);

productRouter.delete('/:productId', deleteProductController);

export default productRouter;
