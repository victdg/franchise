import { FranchiseModel } from "../franchise/FranchiseModel";
import { BranchModel } from "../branch/BranchModel";

export class SequelizeModelInitializer {
  static defineAssociations() {
    this.printAssociations();
    BranchModel.belongsTo(FranchiseModel, {
      foreignKey: "franchiseId", // La columna en BranchModel que almacena la FK
      targetKey: "id", // La columna en FranchiseModel a la que apunta la FK
      as: "franchise", // Alias para acceder a la franquicia desde una sucursal (branch.franchise)
    });

    // Una Franchise (Franquicia) tiene muchas Branches (Sucursales)
    FranchiseModel.hasMany(BranchModel, {
      foreignKey: "franchiseId", // La columna en BranchModel que almacena la FK
      sourceKey: "id", // La columna en FranchiseModel que se usa para la relación
      as: "branches", // Alias para acceder a las sucursales desde una franquicia (franchise.branches)
    });
    console.log("Associations defined");
    this.printAssociations();
  }

  static printAssociations(): void {
    console.log("Associations");
    console.log(FranchiseModel.associations);
    console.log(BranchModel.associations);
    process.env.MODELS_SYNC_COMPLETED = "true";
  }
}

(async () => {
  SequelizeModelInitializer.printAssociations();
  console.log("Models to synchronized");
  try {
    await FranchiseModel.sync({ alter: true });
    await BranchModel.sync({ alter: true });
  } catch (err) {
    console.log(err);
  }

  console.log("Models synchronized");
  SequelizeModelInitializer.printAssociations();
})();
