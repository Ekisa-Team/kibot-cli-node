import mssql from "mssql/msnodesqlv8";

const mssqConnectionPool = new mssql.ConnectionPool({
  driver: "msnodesqlv8",
  database: "Quiron", // TODO: must read from config
  server: "JUAN-WICK", // TODO: must read from config
  user: "", // TODO: must read from config
  password: "", // TODO: must read from config
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
});

export { mssqConnectionPool };
