import { getConnection } from "../../database/connection";
import { Logger } from "../../utils/logger";

const NAMESPACE = "[Root]";

const testDatabaseConnection = async () => {
  Logger.info(`${NAMESPACE} :: (test-db) => Testing database connection`);

  try {
    const pool = await getConnection();
    Logger.success(`Status: ${pool.connected}`);
  } catch (error) {
    Logger.error(error as string);
  }
};

export { testDatabaseConnection };
