import { Constants } from "../../../domain/constants/Constants";
import { TechnicalErrorException } from "../../../domain/exceptions/TechnicalException";
import { Franchise } from "../../../domain/model/franchise";
import { FranchisePersistencePort } from "../../../domain/spi/FranchisePersitencePort";
import { BranchModel } from "../branch/BranchModel";
import { ProductModel } from "../product/ProductModel";
import { FranchiseAdapterMapper } from "./FranchiseAdapterMapper";
import { FranchiseComplete } from "./FranchiseComplete";
import { FranchiseModel, FranchiseAttributes } from "./FranchiseModel";

export class FranchisePersistenceAdapter implements FranchisePersistencePort {
  private readonly franchiseAdapterMapper: FranchiseAdapterMapper;

  constructor(franchiseAdapterMapper: FranchiseAdapterMapper) {
    this.franchiseAdapterMapper = franchiseAdapterMapper;
  }

  async findCompleteById(id: string): Promise<FranchiseComplete | null> {
    try {
      const franchiseComplete = (await FranchiseModel.findOne({
        where: { id },
        include: [
          {
            model: BranchModel,
            as: "branches",
            include: [
              {
                model: ProductModel,
                as: "products",
              },
            ],
          },
        ],
      })) as unknown as FranchiseComplete | null;

      if (!franchiseComplete) {
        return null;
      }

      // Assuming FranchiseAdapterMapper has a method toDomainComplete
      return franchiseComplete;
    } catch (error) {
      console.error("Error finding complete franchise by id:", error);
      if (error instanceof Error) {
        throw new TechnicalErrorException(error.message);
      }
      throw new TechnicalErrorException(Constants.TECHNICAL_ERROR_MESSAGE);
    }
  }

  async findById(id: string): Promise<Franchise | null> {
    try {
      const franchiseModelFound = await FranchiseModel.findByPk(id);
      const result = franchiseModelFound
        ? this.franchiseAdapterMapper.toDomain(franchiseModelFound)
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

  async create(franchise: Franchise): Promise<Franchise> {
    try {
      const franchiseData: Partial<FranchiseAttributes> = {
        id: franchise.getId(),
        name: franchise.getName(),
      };
      console.log("franchiseData", franchiseData);

      await FranchiseModel.sync();

      const createdFranchise = await FranchiseModel.create(
        franchiseData as FranchiseAttributes
      );

      console.log("Saving franchise to the database:", franchise);
      return Promise.resolve(
        this.franchiseAdapterMapper.toDomain(createdFranchise)
      );
      // Simulating successful save
    } catch (error) {
      console.error("Error creating franchise:", error);
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = Constants.TECHNICAL_ERROR_MESSAGE;
      }
      console.error(
        "Error creating franchise:",
        error,
        "Message:",
        errorMessage
      );
      throw new TechnicalErrorException(errorMessage);
    }
  }
}
