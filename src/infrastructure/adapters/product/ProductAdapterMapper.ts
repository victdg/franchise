import { Product } from "../../../domain/model/Product";
import { ProductModel } from "./ProductModel";

export class ProductAdapterMapper {
  toDomain(productDbData: ProductModel): Product {
    const product = new Product();
    product.setBranchId(productDbData.branchId);
    product.setName(productDbData.name);
    product.setStock(productDbData.stock);
    product.setId(productDbData.id);
    return product;
  }
}
