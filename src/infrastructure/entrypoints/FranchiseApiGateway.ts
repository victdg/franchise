import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { FranchiseServicePort } from "../../domain/api/FranchiseServicePort";
import { FranchiseMapperRequest } from "../../application/dto/mapper/FranchiseMapperRequest";

export const FranchiseApiGatewayMaker = (
  franchiseUseCase: FranchiseServicePort,
  franchiseMapperRequest: FranchiseMapperRequest
) => {
  return {
    franchiseCreateApiGateway: async (
      event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
      console.log("ApiGW Franchise called");
      console.log(event);
      return await franchiseUseCase.create(
        franchiseMapperRequest.toDomain(event)
      );
    },

    getTopStockByBranchApiGateway: async (
      event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
      console.log("ApiGW Franchise called gettopStock");
      console.log(event);
      return await franchiseUseCase.getTopStockByBranch(
        franchiseMapperRequest.toGetTopStockDomain(event)
      );
    },
  };
};
