import { FranchiseServicePort } from "../api/FranchiseServicePort";
import { TechnicalErrorException } from "../exceptions/TechnicalException";
import { FranchisePersistencePort } from "../spi/FranchisePersitencePort";
import { Constants } from "../constants/Constants";
import { Franchise } from "../model/franchise";
import { UseCaseResponse } from "../model/UseCaseResponse";

export class FranchiseUseCase implements FranchiseServicePort {
  private readonly franchisePersistencePort: FranchisePersistencePort;

  constructor(franchisePersistencePort: FranchisePersistencePort) {
    this.franchisePersistencePort = franchisePersistencePort;
  }

  async create(franchise: Franchise): Promise<UseCaseResponse> {
    try {
      const createResult = await this.franchisePersistencePort.create(
        franchise
      );
      console.log("franchise created" + createResult);
      return new UseCaseResponse(
        Constants.OK_STATUS_CODE,
        Constants.OK_MESSAGE,
        { id: createResult.getId() }
      );
    } catch (error) {
      let errorMessage: string = Constants.TECHNICAL_ERROR_MESSAGE;
      if (error instanceof TechnicalErrorException) {
        errorMessage = error.message;
      }

      return new UseCaseResponse(
        Constants.INTERNAL_SERVER_ERROR_STATUS_CODE,
        errorMessage
      );
    }
  }
}
