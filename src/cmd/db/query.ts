import chalk from "chalk";
import { getConnection } from "../../database/connection";
import { Logger } from "../../utils/logger";

const testDatabaseConnection = async () => {
  try {
    const pool = await getConnection();
    const connectionStatus = pool.connected
      ? chalk.green.bold("Connected")
      : chalk.red.bold("Disconnected");

    const connectionHealth = pool.healthy
      ? chalk.green.bold("Healthy")
      : chalk.red.bold("Unhealthy");

    Logger.log(
      "Status ->",
      connectionStatus,
      " - ",
      "Connection ->",
      connectionHealth
    );
  } catch (error) {
    Logger.error(error as string);
  }
};

export { testDatabaseConnection };
