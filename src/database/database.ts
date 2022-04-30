import { ConnectionPool } from "mssql";
import { mssqConnectionPool } from "./mssql";

type DB = {
  connection: {
    open: () => Promise<ConnectionPool>;
  };
};

const db: DB = {
  connection: {
    open: async (): Promise<ConnectionPool> => {
      return await mssqConnectionPool.connect();
    },
  },
};

export { db };
