import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { Product } from "../../../domain/model/Product";

export class ProductMapperRequest {
  public toDomain(request: APIGatewayProxyEvent): Product {
    const body = JSON.parse(request.body ?? "{}");
    const product = new Product();
    product.setBranchId(body.branchId);
    product.setName(body.name);
    product.setStock(body.stock);
    return product;
  }

  public toUpdateDomain(request: APIGatewayProxyEvent): Product {
    const body = JSON.parse(request.body ?? "{}");
    const id = request.pathParameters?.productId!;

    const product = new Product();
    product.setId(id);
    product.setStock(body.stock);
    return product;
  }

  public toDeleteDomain(request: APIGatewayProxyEvent): string {
    return request.pathParameters?.productId!;
  }
}
