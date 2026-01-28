import { Router } from 'express';

import { ProductModel } from '../../infrastructure/models/product-models';
import { createProductController } from '../controllers/products/create-product-controller';

const productRouter = Router();

productRouter.get('/', async (_req, res) => {
  const products = await ProductModel.find();
  res.json({ content: products });
});

productRouter.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product Not Found' });
  }

  return res.json({ content: product });
});

productRouter.post('/', createProductController);

productRouter.patch('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { name, description } = req.body;

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    { name, description },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(400).json({ message: 'Not found' });
  }

  return res.status(200).json({ content: updatedProduct });
});

productRouter.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  const deletedProduct = await ProductModel.findByIdAndDelete(productId);

  if (!deletedProduct) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.json({ message: 'Product removed successfully' });
});

export default productRouter;
