import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    // esto crea createdAt y updatedAt automáticamente en la db
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', ProductSchema, 'Products');
