import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ProductServicePort } from "../../domain/api/ProductServicePort";
import { ProductMapperRequest } from "../../application/dto/mapper/ProductMapperRequest";

export const ProductApiGatewayMaker = (
  productUseCase: ProductServicePort,
  productMapperRequest: ProductMapperRequest
) => {
  return {
    productCreateApiGateway: async (
      event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
      console.log("ApiGW product create called");
      console.log(event);
      return await productUseCase.create(productMapperRequest.toDomain(event));
    },
    productUpdateApiGateway: async (
      event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
      console.log("ApiGW product update called");
      console.log(event);
      return await productUseCase.update(
        productMapperRequest.toUpdateDomain(event)
      );
    },
    productDeleteApiGateway: async (
      event: APIGatewayProxyEvent
    ): Promise<APIGatewayProxyResult> => {
      console.log("ApiGW product delete called");
      console.log(event);
      return await productUseCase.delete(
        productMapperRequest.toDeleteDomain(event)
      );
    },
  };
};
