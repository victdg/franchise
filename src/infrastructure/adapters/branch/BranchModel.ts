import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import { FranchiseModel } from "../franchise/FranchiseModel";

export interface BranchAttributes {
  id: string;
  franchiseId: string;
  name: string;
}

interface BranchCreationAttributes extends Optional<BranchAttributes, "id"> {}

class BranchModel
  extends Model<BranchAttributes, BranchCreationAttributes>
  implements BranchAttributes
{
  public id!: string;
  public franchiseId!: ForeignKey<FranchiseModel["id"]>;
  public name!: string;

  // Timestamps (Sequelize los añade si timestamps: true en la definición del modelo)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BranchModel.init(
  {
    id: {
      type: DataTypes.UUID, // O DataTypes.UUID si usas UUIDs
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    franchiseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pasa la instancia de conexión
    modelName: "Branch", // Nombre del modelo
    tableName: "branches", // Nombre de la tabla en la BD (opcional, Sequelize lo infiere)
    timestamps: true, // Habilita createdAt y updatedAt
  }
);

export { BranchModel };
