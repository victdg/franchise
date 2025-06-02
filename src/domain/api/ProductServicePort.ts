import { Product } from "../model/Product";
import { UseCaseResponse } from "../model/UseCaseResponse";

export interface ProductServicePort {
  create(product: Product): Promise<UseCaseResponse>;
  update(product: Product): Promise<UseCaseResponse>;
  delete(productId: string): Promise<UseCaseResponse>;
}
