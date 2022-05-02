import chalk from "chalk";
import mssql from "mssql/msnodesqlv8";
import { readGlobalConfig } from "../utils/config";
import { Logger } from "../utils/logger";

const dbConfig = readGlobalConfig()?.apps?.quiron?.database;

if (!dbConfig) {
  throw new Error(chalk.red.bold("Database config was not found"));
}

const mssqlConfig: mssql.config = {
  driver: "msnodesqlv8",
  database: dbConfig.database,
  server: dbConfig.server || "",
  user: dbConfig.user,
  password: dbConfig.password,
  options: {
    trustedConnection: dbConfig.options?.trustedConnection,
    trustServerCertificate: dbConfig.options?.trustServerCertificate,
  },
};

export const getConnection = async (): Promise<mssql.ConnectionPool> => {
  try {
    const pool = mssql.connect(mssqlConfig);
    return pool;
  } catch (error) {
    return Logger.error(error);
  }
};

export { mssql };
