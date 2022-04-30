import mssql from "mssql/msnodesqlv8";

const mssqConnectionPool = new mssql.ConnectionPool({
  driver: "msnodesqlv8",
  database: "Quiron",
  server: "JUAN-WICK",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
});

export { mssqConnectionPool };
