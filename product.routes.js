import express from 'express';

import { Product } from './product.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.json({ content: products });
});

export default productRouter;
