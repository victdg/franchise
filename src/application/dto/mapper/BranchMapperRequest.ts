import { APIGatewayProxyEvent } from "aws-lambda";
import { Branch } from "../../../domain/model/Branch";

export class BranchMapperRequest {
  public toDomain(request: APIGatewayProxyEvent): Branch {
    const body = JSON.parse(request.body ?? "{}");
    const branch = new Branch();
    branch.setName(body.name);
    branch.setFranchiseId(body.franchiseId);
    return branch;
  }
}
