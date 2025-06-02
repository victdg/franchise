import { Constants } from "../../../domain/constants/Constants";
import { TechnicalErrorException } from "../../../domain/exceptions/TechnicalException";
import { Product } from "../../../domain/model/Product";
import { UseCaseResponse } from "../../../domain/model/UseCaseResponse";
import { ProductPersistencePort } from "../../../domain/spi/ProductPersistencePort";
import { ProductAdapterMapper } from "./ProductAdapterMapper";
import { ProductCreationAttributes, ProductModel } from "./ProductModel";

export class ProductPersistenceAdapter implements ProductPersistencePort {
  private readonly productAdapterMapper: ProductAdapterMapper;

  constructor(productAdapterMapper: ProductAdapterMapper) {
    this.productAdapterMapper = productAdapterMapper;
  }

  async create(product: Product): Promise<Product> {
    try {
      await ProductModel.sync();
      const productData: ProductCreationAttributes = {
        name: product.getName()!,
        branchId: product.getBranchId()!,
        stock: product.getStock()!,
      };

      const createdProduct = await ProductModel.create(productData);

      console.log("Created Product:", createdProduct);

      return this.productAdapterMapper.toDomain(createdProduct);
    } catch (error) {
      console.error("Error creating branch:", error);
      if (error instanceof Error) {
        throw new TechnicalErrorException(error.message);
      }
      throw error;
    }
  }
  findById(id: string): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
  update(product: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
