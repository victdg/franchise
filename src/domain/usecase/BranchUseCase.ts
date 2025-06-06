import { BranchServicePort } from "../api/BranchServicePort";
import { Constants } from "../constants/Constants";
import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { Branch } from "../model/Branch";
import { UseCaseResponse } from "../model/UseCaseResponse";
import { BranchPersistencePort } from "../spi/BranchPersistencePort";
import { FranchisePersistencePort } from "../spi/FranchisePersitencePort";
import { DomainErrorMapper } from "../utils/DomainErrorMapper";

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
      console.log("branch::>> ", branch);
      this.bodyCreateValidation(branch);
      const franchiseAssociated = await this.franchisePersistencePort.findById(
        branch.getFranchiseId()
      );
      console.log("franchiseAssociated::>> ", franchiseAssociated);

      if (franchiseAssociated === null) throw new NotFoundException();

      const createResult = await this.branchPersistencePort.create(branch);
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

  private bodyCreateValidation(branch: Branch): void {
    if (
      branch.getName() === null ||
      branch.getName() === undefined ||
      branch.getName() === "" ||
      branch.getFranchiseId() === null ||
      branch.getFranchiseId() === undefined ||
      branch.getFranchiseId() === ""
    ) {
      throw new BadRequestException();
    }
  }
}
