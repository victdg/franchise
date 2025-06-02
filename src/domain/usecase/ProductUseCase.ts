import { ProductServicePort } from "../api/ProductServicePort";
import { Constants } from "../constants/Constants";
import { Product } from "../model/Product";
import { UseCaseResponse } from "../model/UseCaseResponse";
import { BranchPersistencePort } from "../spi/BranchPersistencePort";
import { ProductPersistencePort } from "../spi/ProductPersistencePort";

export class ProductUseCase implements ProductServicePort {
  private readonly productPersistencePort: ProductPersistencePort;
  private readonly branchPersistencePort: BranchPersistencePort;

  constructor(
    productPersistencePort: ProductPersistencePort,
    branchPersistencePort: BranchPersistencePort
  ) {
    this.productPersistencePort = productPersistencePort;
    this.branchPersistencePort = branchPersistencePort;
  }

  async create(product: Product): Promise<UseCaseResponse> {
    try {
      const branchAssociated = await this.branchPersistencePort.findById(
        product.getBranchId()!
      );

      console.log("branchAssociated::>> ", branchAssociated);

      if (branchAssociated === null) {
        return new UseCaseResponse(
          Constants.NOT_FOUND_STATUS_CODE,
          Constants.NOT_FOUND_MESSAGE
        );
      }

      const createResult = await this.productPersistencePort.create(product);

      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE,
        { id: createResult.getId() }
      );
    } catch (error) {
      console.log("error::>> ", error);
      return new UseCaseResponse(
        Constants.INTERNAL_SERVER_ERROR_STATUS_CODE,
        Constants.INTERNAL_SERVER_ERROR_MESSAGE
      );
    }
  }

  async update(product: Product): Promise<UseCaseResponse> {
    try {
      const productToUpdate = await this.productPersistencePort.findById(
        product.getId()!
      );
      console.log("productToUpdate::>> ", productToUpdate);
      if (productToUpdate === null) {
        return new UseCaseResponse(
          Constants.NOT_FOUND_STATUS_CODE,
          Constants.NOT_FOUND_MESSAGE
        );
      }

      await this.productPersistencePort.update(product);
      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE
      );
    } catch (error) {
      console.log("error::>> ", error);
      return new UseCaseResponse(
        Constants.INTERNAL_SERVER_ERROR_STATUS_CODE,
        Constants.INTERNAL_SERVER_ERROR_MESSAGE
      );
    }
  }

  async delete(productId: string): Promise<UseCaseResponse> {
    try {
      const productToUpdate = await this.productPersistencePort.findById(
        productId
      );
      console.log("productToUpdate::>> ", productToUpdate);
      if (productToUpdate === null) {
        return new UseCaseResponse(
          Constants.NOT_FOUND_STATUS_CODE,
          Constants.NOT_FOUND_MESSAGE
        );
      }

      await this.productPersistencePort.delete(productId);
      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE
      );
    } catch (error) {
      console.log("error::>> ", error);
      return new UseCaseResponse(
        Constants.INTERNAL_SERVER_ERROR_STATUS_CODE,
        Constants.INTERNAL_SERVER_ERROR_MESSAGE
      );
    }
  }
}
