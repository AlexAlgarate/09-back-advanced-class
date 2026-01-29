import { Router } from 'express';

import { ProductModel } from '../../infrastructure/models/product-models';
import { createProductController } from '../controllers/products/create-product-controller';
import { findProductsController } from '../controllers/products/find-products-controller';
import { findProductController } from '../controllers/products/find-product-controller';
import { updateProductController } from '../controllers/products/update-product-controller';

const productRouter = Router();

productRouter.get('/', findProductsController);

productRouter.get('/:productId', findProductController);

productRouter.post('/', createProductController);

productRouter.patch('/:productId', updateProductController);

productRouter.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  const deletedProduct = await ProductModel.findByIdAndDelete(productId);

  if (!deletedProduct) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.json({ message: 'Product removed successfully' });
});

export default productRouter;
