import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import sequelize from "../config/sequelize";
import { BranchModel } from "../branch/BranchModel";

// Atributos que el modelo Product tendrá
export interface ProductAttributes {
  id: string;
  branchId: string;
  name: string;
  stock: number;
}

// Algunos atributos son opcionales durante la creación del modelo (ej: id si es autogenerado por la BD o UUID)
// Sequelize maneja createdAt y updatedAt automáticamente si timestamps: true
export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}

class ProductModel
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public branchId!: ForeignKey<BranchModel["id"]>;
  public name!: string;
  public stock!: number;

  // Timestamps (Sequelize los añade si timestamps: true en la definición del modelo)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.UUID, // O DataTypes.UUID si usas UUIDs
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    branchId: {
      type: DataTypes.UUID, // O DataTypes.UUID si usas UUIDs
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize, // Pasa la instancia de conexión
    modelName: "Product", // Nombre del modelo
    tableName: "products", // Nombre de la tabla en la BD (opcional, Sequelize lo infiere)
    timestamps: true, // Habilita createdAt y updatedAt
  }
);

export { ProductModel };
