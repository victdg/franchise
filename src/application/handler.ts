import { BranchUseCase } from "../domain/usecase/BranchUseCase";
import { FranchiseUseCase } from "../domain/usecase/FranchiseUseCase";
import { BranchAdapterMapper } from "../infrastructure/adapters/branch/BranchAdapterMapper";
import { BranchPersistenceAdapter } from "../infrastructure/adapters/branch/BranchPersistenceAdapter";
import { SequelizeModelInitializer } from "../infrastructure/adapters/config/SequelizeModelInitializer";
import { FranchiseAdapterMapper } from "../infrastructure/adapters/franchise/FranchiseAdapterMapper";
import { FranchisePersistenceAdapter } from "../infrastructure/adapters/franchise/FranchisePersistenceAdapter";
import { BranchApiGatewayMaker } from "../infrastructure/entrypoints/BranchApiGateway";
import { FranchiseApiGatewayMaker } from "../infrastructure/entrypoints/FranchiseApiGateway";
import { BranchMapperRequest } from "./dto/mapper/BranchMapperRequest";
import { FranchiseMapperRequest } from "./dto/mapper/FranchiseMapperRequest";

console.log("Handler begin before sequelize initialization");
SequelizeModelInitializer.defineAssociations();
console.log("Handler begin after sequelize initialization");

const franchiseAdapterMapper = new FranchiseAdapterMapper();
const branchAdapterMapper = new BranchAdapterMapper();

const franchisePersistenceAdapter = new FranchisePersistenceAdapter(
  franchiseAdapterMapper
);

const branchPersistenceAdapter = new BranchPersistenceAdapter(
  branchAdapterMapper
);

const franchiseMapperRequest = new FranchiseMapperRequest();
const branchMapperRequest = new BranchMapperRequest();

const franchiseUseCase = new FranchiseUseCase(franchisePersistenceAdapter);
const branchUseCase = new BranchUseCase(
  branchPersistenceAdapter,
  franchisePersistenceAdapter
);

export const { franchiseCreateApiGateway } = FranchiseApiGatewayMaker(
  franchiseUseCase,
  franchiseMapperRequest
);

export const { branchCreateApiGateway } = BranchApiGatewayMaker(
  branchUseCase,
  branchMapperRequest
);
