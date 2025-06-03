import { Constants } from "../../../domain/constants/Constants";
import { TechnicalErrorException } from "../../../domain/exceptions/TechnicalException";
import { Branch } from "../../../domain/model/Branch";
import { BranchPersistencePort } from "../../../domain/spi/BranchPersistencePort";
import { BranchAdapterMapper } from "./BranchAdapterMapper";
import { BranchAttributes, BranchModel } from "./BranchModel";

export class BranchPersistenceAdapter implements BranchPersistencePort {
  private readonly branchAdapterMapper: BranchAdapterMapper;

  constructor(branchAdapterMapper: BranchAdapterMapper) {
    this.branchAdapterMapper = branchAdapterMapper;
  }
  async findById(id: string): Promise<Branch | null> {
    try {
      const branchModelFound = await BranchModel.findByPk(id);
      const result =
        branchModelFound !== null
          ? this.branchAdapterMapper.toDomain(branchModelFound)
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

  async create(branch: Branch): Promise<Branch> {
    try {
      await BranchModel.sync({ alter: true });
      const branchData: Partial<BranchAttributes> = {
        franchiseId: branch.getFranchiseId(),
        name: branch.getName(),
      };

      const createdBranch = await BranchModel.create(
        branchData as BranchAttributes
      );
      console.log("Created Branch:", createdBranch);

      return this.branchAdapterMapper.toDomain(createdBranch);
    } catch (error) {
      console.error("Error creating branch:", error);
      if (error instanceof Error) {
        throw new TechnicalErrorException(error.message);
      }
      throw error;
    }
  }
}
