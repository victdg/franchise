import { Product } from "../model/Product";

export interface ProductPersistencePort {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  update(product: Product): Promise<void>;
  delete(productId: string): Promise<void>;
}
