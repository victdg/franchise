import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BranchServicePort } from "../../domain/api/BranchServicePort";
import { BranchMapperRequest } from "../../application/dto/mapper/BranchMapperRequest";

export const BranchApiGatewayMaker = (
  branchUseCase: BranchServicePort,
  branchMapperRequest: BranchMapperRequest
) => {
  return {
    branchCreateApiGateway: async (
      event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
      console.log("ApiGW Branch called");
      console.log(event);
      return await branchUseCase.create(branchMapperRequest.toDomain(event));
    },
  };
};
