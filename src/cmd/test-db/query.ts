import { db } from "../../database/database";
import { Logger } from "../../utils/logger";

const NAMESPACE = "[Root]";

const testDatabaseConnection = async () => {
  Logger.info(`${NAMESPACE} :: (test-db) => Testing database connection`);

  try {
    const conn = await db.connection.open();
    Logger.success(`Status: ${conn.connected}`);
    conn.close();
  } catch (err) {
    Logger.error(err);
  }
};

export { testDatabaseConnection };
