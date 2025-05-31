import { Franchise } from "../model/franchise";

export interface FranchisePersistencePort {
  create(franchise: Franchise): Promise<Franchise>;
  findById(id: string): Promise<Franchise | null>;
}
