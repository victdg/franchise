import { Franchise } from "../../../domain/model/franchise";
import { FranchiseModel } from "./FranchiseModel";

export class FranchiseAdapterMapper {
  toDomain(franchiseDbModel: FranchiseModel): Franchise {
    const franchise = new Franchise();
    franchise.setId(franchiseDbModel.id);
    franchise.setName(franchiseDbModel.name);
    return franchise;
  }
}
