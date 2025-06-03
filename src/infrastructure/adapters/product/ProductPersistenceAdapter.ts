import { Constants } from "../../../domain/constants/Constants";
import { TechnicalErrorException } from "../../../domain/exceptions/TechnicalException";
import { Product } from "../../../domain/model/Product";
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

      await ProductModel.sync();

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

  async findById(id: string): Promise<Product | null> {
    try {
      const productModelFound = await ProductModel.findByPk(id);
      const result =
        productModelFound !== null
          ? this.productAdapterMapper.toDomain(productModelFound)
          : null;
      return result;
    } catch (error) {
      console.log("Error infra::>> ", error);
      if (error instanceof Error) {
        throw new TechnicalErrorException(error.message);
      }
      throw new TechnicalErrorException(Constants.TECHNICAL_ERROR_MESSAGE);
    }
  }

  async update(product: Product): Promise<void> {
    try {
      const dataToUpdate: Partial<ProductModel> = {
        stock: product.getStock(),
      };
      await ProductModel.update(dataToUpdate, {
        where: { id: product.getId() },
      });
    } catch (error) {
      console.log("Error infra::>> ", error);
      if (error instanceof Error) {
        throw new TechnicalErrorException(error.message);
      }
      throw new TechnicalErrorException(Constants.TECHNICAL_ERROR_MESSAGE);
    }
  }

  async delete(productId: string): Promise<void> {
    await ProductModel.destroy({ where: { id: productId } });
  }
}
