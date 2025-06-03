import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import { BranchModel } from "../branch/BranchModel";

// Atributos que el modelo Franchise tendrá
export interface FranchiseAttributes {
  id: string;
  name: string;

  readonly branches?: BranchModel[];
}

// Algunos atributos son opcionales durante la creación del modelo (ej: id si es autogenerado por la BD o UUID)
// Sequelize maneja createdAt y updatedAt automáticamente si timestamps: true
interface FranchiseCreationAttributes
  extends Optional<Omit<FranchiseAttributes, "branches">, "id"> {}

class FranchiseModel
  extends Model<FranchiseAttributes, FranchiseCreationAttributes>
  implements FranchiseAttributes
{
  public id!: string;
  public name!: string;

  public readonly branches?: BranchModel[];

  // Timestamps (Sequelize los añade si timestamps: true en la definición del modelo)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FranchiseModel.init(
  {
    id: {
      type: DataTypes.UUID, // O DataTypes.UUID si usas UUIDs
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pasa la instancia de conexión
    modelName: "Franchise", // Nombre del modelo
    tableName: "franchises", // Nombre de la tabla en la BD (opcional, Sequelize lo infiere)
    timestamps: true, // Habilita createdAt y updatedAt
  }
);

export { FranchiseModel };
