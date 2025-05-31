import { Franchise } from "../model/franchise";
import { UseCaseResponse } from "../model/UseCaseResponse";

export interface FranchiseServicePort {
  create(franchise: Franchise): Promise<UseCaseResponse>;
}
