import { Sequelize } from "sequelize";

// Recuperar los detalles de conexión de la BD desde las variables de entorno
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;

let sequelize: Sequelize;

if (!dbName || !dbUser || !dbPassword || !dbHost) {
  console.error(
    "¡Variables de entorno para la configuración de la base de datos no están completamente definidas!"
  );
  // En un entorno Lambda, esto podría significar que la función no puede operar.
  // Podrías lanzar un error aquí o manejarlo de forma que la Lambda falle graciosamente.
  // Por ahora, crearemos una instancia no funcional para evitar errores de 'sequelize is not defined'.
  console.log("Sequelize error");
  sequelize = new Sequelize(); // Instancia no funcional
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    logging: console.log, // Habilita el logging para depuración; considera deshabilitarlo o personalizarlo para producción.
    pool: {
      // Opcional: configura el pool de conexiones
      max: 5, // Máximo de conexiones en el pool
      min: 0, // Mínimo de conexiones en el pool
      acquire: 30000, // Tiempo máximo, en milisegundos, que el pool intentará obtener una conexión antes de lanzar un error
      idle: 10000, // Tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
    },
    dialectOptions: {
      // Opciones específicas del dialecto, si son necesarias
      // Por ejemplo, para SSL:
      // ssl: { require: true, rejectUnauthorized: false }
    },
  });
}

export default sequelize;
