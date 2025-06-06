import { ProductServicePort } from "../api/ProductServicePort";
import { Constants } from "../constants/Constants";
import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Product } from "../model/Product";
import { UseCaseResponse } from "../model/UseCaseResponse";
import { BranchPersistencePort } from "../spi/BranchPersistencePort";
import { ProductPersistencePort } from "../spi/ProductPersistencePort";
import { DomainErrorMapper } from "../utils/DomainErrorMapper";

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
      this.bodyCreateValidation(product);
      const branchAssociated = await this.branchPersistencePort.findById(
        product.getBranchId()!
      );

      console.log("branchAssociated::>> ", branchAssociated);

      if (branchAssociated === null) throw new NotFoundException();

      const createResult = await this.productPersistencePort.create(product);

      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE,
        { id: createResult.getId() }
      );
    } catch (error) {
      console.log("error::>> ", error);
      return DomainErrorMapper.toUseCaseResponse(error);
    }
  }

  async update(product: Product): Promise<UseCaseResponse> {
    try {
      this.bodyUpdateValidation(product);

      const productToUpdate = await this.productPersistencePort.findById(
        product.getId()!
      );
      console.log("productToUpdate::>> ", productToUpdate);
      if (productToUpdate === null) throw new NotFoundException();

      await this.productPersistencePort.update(product);
      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE
      );
    } catch (error) {
      console.log("error::>> ", error);
      return DomainErrorMapper.toUseCaseResponse(error);
    }
  }

  async delete(productId: string): Promise<UseCaseResponse> {
    try {
      const productToUpdate = await this.productPersistencePort.findById(
        productId
      );
      console.log("productToUpdate::>> ", productToUpdate);
      if (productToUpdate === null) throw new NotFoundException();

      await this.productPersistencePort.delete(productId);
      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE
      );
    } catch (error) {
      console.log("error::>> ", error);
      return DomainErrorMapper.toUseCaseResponse(error);
    }
  }

  private bodyCreateValidation(product: Product): void {
    if (
      product.getName() === null ||
      product.getName() === undefined ||
      product.getName() === "" ||
      product.getBranchId() === null ||
      product.getBranchId() === undefined ||
      product.getBranchId() === "" ||
      product.getStock() === null ||
      product.getStock() === undefined ||
      product.getStock()! < 0
    ) {
      throw new BadRequestException();
    }
  }

  private bodyUpdateValidation(product: Product): void {
    if (
      product.getStock() === null ||
      product.getStock() === undefined ||
      product.getStock()! < 0
    ) {
      throw new BadRequestException();
    }
  }
}
