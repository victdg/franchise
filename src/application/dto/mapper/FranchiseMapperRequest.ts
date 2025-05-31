import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { Franchise } from "../../../domain/model/franchise";

export class FranchiseMapperRequest {
  public toDomain(request: APIGatewayProxyEvent): Franchise {
    const body = JSON.parse(request.body ?? "{}");
    const franchise = new Franchise();
    franchise.setName(body.name);
    return franchise;
  }
}
