import { FranchiseServicePort } from "../api/FranchiseServicePort";
import { FranchisePersistencePort } from "../spi/FranchisePersitencePort";
import { Constants } from "../constants/Constants";
import { Franchise } from "../model/franchise";
import { UseCaseResponse } from "../model/UseCaseResponse";
import { FranchiseComplete } from "../../infrastructure/adapters/franchise/FranchiseComplete";
import { TopStockByBranchReport } from "../model/TopStockByBranch";
import { BadRequestException } from "../exceptions/BadRequestException";
import { DomainErrorMapper } from "../utils/DomainErrorMapper";
import { NotFoundException } from "../exceptions/NotFoundException";

export class FranchiseUseCase implements FranchiseServicePort {
  private readonly franchisePersistencePort: FranchisePersistencePort;

  constructor(franchisePersistencePort: FranchisePersistencePort) {
    this.franchisePersistencePort = franchisePersistencePort;
  }

  async getTopStockByBranch(franchiseId: string): Promise<UseCaseResponse> {
    try {
      const franchiseData =
        await this.franchisePersistencePort.findCompleteById(franchiseId);

      if (franchiseData === null) throw new NotFoundException();
      console.log("franchiseData::>> ", franchiseData);

      const topStockByBranch = this.getTopStockCompute(franchiseData);
      console.log("topStockByBranch::>> ", topStockByBranch);

      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE,
        topStockByBranch
      );
    } catch (error) {
      console.log("error::>> ", error);
      return DomainErrorMapper.toUseCaseResponse(error);
    }
  }

  async create(franchise: Franchise): Promise<UseCaseResponse> {
    try {
      this.bodyCreateValidation(franchise);
      const createResult = await this.franchisePersistencePort.create(
        franchise
      );
      console.log("franchise created" + JSON.stringify(createResult));
      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE,
        { id: createResult.getId() }
      );
    } catch (error) {
      console.log(error);
      return DomainErrorMapper.toUseCaseResponse(error);
    }
  }

  private getTopStockCompute(
    franchiseData: FranchiseComplete
  ): TopStockByBranchReport[] {
    const topStockByBranch: TopStockByBranchReport[] = [];
    for (const branch of franchiseData.branches) {
      const id = branch.id;
      const name = branch.name;

      const initialValue = { id: "N/A", name: "N/A", stock: 0 };
      const maxStock = branch.products.reduce(
        (previousValue, currentValue) =>
          currentValue.stock > previousValue.stock
            ? currentValue
            : previousValue,
        initialValue
      );
      console.log("maxStock::>> ", maxStock);

      topStockByBranch.push({
        id,
        name,
        productId: maxStock.id,
        productName: maxStock.name,
        productStock: maxStock.stock,
      });
    }
    return topStockByBranch;
  }

  private bodyCreateValidation(franchise: Franchise): void {
    if (
      franchise.getName() === null ||
      franchise.getName() === undefined ||
      franchise.getName() === ""
    ) {
      throw new BadRequestException();
    }
  }
}
