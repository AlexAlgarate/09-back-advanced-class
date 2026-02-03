import * as z from 'zod';

export const productIdParamsSchema = z.object({
  productId: z.string(),
});

export const createProductBodySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(150, 'Description must be at most 150 characters'),
});

export const updateProductBodySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(150, 'Description must be at most 150 characters')
    .optional(),
});

export const authenticatedUserSchema = z.object({
  id: z.string(),
});

export type ProductIdParams = z.infer<typeof productIdParamsSchema>;
export type CreateProductBody = z.infer<typeof createProductBodySchema>;
export type UpdateProductBody = z.infer<typeof updateProductBodySchema>;
export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;
