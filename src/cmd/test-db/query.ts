import { db } from "../../database/database";

const NAMESPACE = "[Root]";

const testDatabaseConnection = async () => {
  console.log(`${NAMESPACE} :: (test-db) => Testing database connection`);

  try {
    const conn = await db.connection.open();
    console.log(`Status: ${conn.connected}`);
    conn.close();
  } catch (err) {
    console.log(err);
  }
};

export { testDatabaseConnection };
