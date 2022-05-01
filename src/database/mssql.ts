import chalk from "chalk";
import { readGlobalConfig } from "../utils/config";
const mssql = require("msnodesqlv8");

const dbConfig = readGlobalConfig()?.apps?.quiron?.database;

if (!dbConfig) {
  throw new Error(chalk.red.bold("Database config was not found"));
}

const mssqConnectionPool = new mssql.ConnectionPool({
  driver: "msnodesqlv8",
  database: dbConfig.database,
  server: dbConfig.server || "",
  user: dbConfig.user,
  password: dbConfig.password,
  options: {
    trustedConnection: dbConfig.options?.trustedConnection,
    trustServerCertificate: dbConfig.options?.trustServerCertificate,
  },
});

export { mssqConnectionPool };
