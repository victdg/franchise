import { BranchUseCase } from "../domain/usecase/BranchUseCase";
import { FranchiseUseCase } from "../domain/usecase/FranchiseUseCase";
import { ProductUseCase } from "../domain/usecase/ProductUseCase";
import { BranchAdapterMapper } from "../infrastructure/adapters/branch/BranchAdapterMapper";
import { BranchPersistenceAdapter } from "../infrastructure/adapters/branch/BranchPersistenceAdapter";
import { SequelizeModelInitializer } from "../infrastructure/adapters/config/SequelizeModelInitializer";
import { FranchiseAdapterMapper } from "../infrastructure/adapters/franchise/FranchiseAdapterMapper";
import { FranchisePersistenceAdapter } from "../infrastructure/adapters/franchise/FranchisePersistenceAdapter";
import { ProductAdapterMapper } from "../infrastructure/adapters/product/ProductAdapterMapper";
import { ProductPersistenceAdapter } from "../infrastructure/adapters/product/ProductPersistenceAdapter";
import { BranchApiGatewayMaker } from "../infrastructure/entrypoints/BranchApiGateway";
import { FranchiseApiGatewayMaker } from "../infrastructure/entrypoints/FranchiseApiGateway";
import { ProductApiGatewayMaker } from "../infrastructure/entrypoints/ProductApiGateway";
import { BranchMapperRequest } from "./dto/mapper/BranchMapperRequest";
import { FranchiseMapperRequest } from "./dto/mapper/FranchiseMapperRequest";
import { ProductMapperRequest } from "./dto/mapper/ProductMapperRequest";

console.log("Handler begin before sequelize initialization");
SequelizeModelInitializer.defineAssociations();
console.log("Handler begin after sequelize initialization");

const franchiseAdapterMapper = new FranchiseAdapterMapper();
const branchAdapterMapper = new BranchAdapterMapper();
const productAdapterMapper = new ProductAdapterMapper();

const franchisePersistenceAdapter = new FranchisePersistenceAdapter(
  franchiseAdapterMapper
);

const branchPersistenceAdapter = new BranchPersistenceAdapter(
  branchAdapterMapper
);

const productPersistenceAdapter = new ProductPersistenceAdapter(
  productAdapterMapper
);

const franchiseMapperRequest = new FranchiseMapperRequest();
const branchMapperRequest = new BranchMapperRequest();
const productMapperRequest = new ProductMapperRequest();

const franchiseUseCase = new FranchiseUseCase(franchisePersistenceAdapter);
const branchUseCase = new BranchUseCase(
  branchPersistenceAdapter,
  franchisePersistenceAdapter
);
const productUseCase = new ProductUseCase(
  productPersistenceAdapter,
  branchPersistenceAdapter
);

export const { franchiseCreateApiGateway, getTopStockByBranchApiGateway } =
  FranchiseApiGatewayMaker(franchiseUseCase, franchiseMapperRequest);

export const { branchCreateApiGateway } = BranchApiGatewayMaker(
  branchUseCase,
  branchMapperRequest
);

export const {
  productCreateApiGateway,
  productUpdateApiGateway,
  productDeleteApiGateway,
} = ProductApiGatewayMaker(productUseCase, productMapperRequest);
