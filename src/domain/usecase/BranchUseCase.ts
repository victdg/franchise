import { BranchServicePort } from "../api/BranchServicePort";
import { Constants } from "../constants/Constants";
import { Branch } from "../model/Branch";
import { UseCaseResponse } from "../model/UseCaseResponse";
import { BranchPersistencePort } from "../spi/BranchPersistencePort";
import { FranchisePersistencePort } from "../spi/FranchisePersitencePort";

export class BranchUseCase implements BranchServicePort {
  private readonly branchPersistencePort: BranchPersistencePort;
  private readonly franchisePersistencePort: FranchisePersistencePort;

  constructor(
    branchPersistencePort: BranchPersistencePort,
    franchisePersistencePort: FranchisePersistencePort
  ) {
    this.branchPersistencePort = branchPersistencePort;
    this.franchisePersistencePort = franchisePersistencePort;
  }

  async create(branch: Branch): Promise<UseCaseResponse> {
    try {
      const franchiseAssociated = await this.franchisePersistencePort.findById(
        branch.getFranchiseId()
      );
      console.log("franchiseAssociated::>> ", franchiseAssociated);

      if (franchiseAssociated === null) {
        return new UseCaseResponse(
          Constants.NOT_FOUND_STATUS_CODE,
          Constants.NOT_FOUND_MESSAGE
        );
      }

      const createResult = await this.branchPersistencePort.create(branch);
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
}
