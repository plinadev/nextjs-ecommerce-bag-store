import {
  cartItemSchema,
  insertCartSchema,
  insertProductsSchema,
} from "@/lib/validators";
import z from "zod";

export type Product = z.infer<typeof insertProductsSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;
