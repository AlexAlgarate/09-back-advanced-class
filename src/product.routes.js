import express from 'express';

import { Product } from './product.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.json({ content: products });
});

productRouter.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product Not Found' });
  }

  res.json({ content: product });
});

productRouter.post('/', async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      message: 'name and description have to be dedfined',
    });
  }

  const newProduct = new Product({
    name,
    description,
  });
  const productDb = await newProduct.save();

  return res.status(201).json({ content: productDb });
});

productRouter.patch('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { name, description } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
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

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    return res.status(400).json({ message: 'Not found' });
  }
  return res.json({ message: 'Product removed successfully' });
});

export default productRouter;
