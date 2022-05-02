import chalk from "chalk";
import {
  CLIConfig,
  createGlobalConfig,
  defaultConfig,
  getGlobalConfigPath,
  readGlobalConfig,
  removeGlobalConfig,
} from "../../utils/config";
import { Logger } from "../../utils/logger";

/**
 * Reveal global config file path
 */
const revealConfigFile = async () => {
  Logger.info(chalk.underline(getGlobalConfigPath()));
};

/**
 * Preview global config file content
 */
const previewConfigFile = async () => {
  const currentConfig = readGlobalConfig();
  if (currentConfig) {
    Logger.json(currentConfig);
  }
};

/**
 * Removes CLI global config
 */
const removeConfigFile = async () => {
  await removeGlobalConfig();
};

/**
 * Create global config file for the CLI
 * @param options command options
 */
const createConfigFile = async (
  app: "quiron",
  options: Record<string, string>
) => {
  // Validate app name
  const currentApps = ["quiron"];

  if (!currentApps.includes(app.toLowerCase())) {
    Logger.error("App", chalk.bold.underline(app), "is not yet available");
  }

  const newConfig: CLIConfig = { apps: {} };

  // Map config object
  if (app === "quiron") {
    newConfig.apps!.quiron = {
      client: !isNaN(+options.client)
        ? +options.client
        : defaultConfig.apps?.quiron?.client,
      database: {
        database:
          options.database || defaultConfig.apps?.quiron?.database?.database,
        server: options.server || defaultConfig.apps?.quiron?.database?.server,
        user: options.user || defaultConfig.apps?.quiron?.database?.user,
        password:
          options.user || defaultConfig.apps?.quiron?.database?.password,
        options: {
          trustedConnection:
            defaultConfig.apps?.quiron?.database?.options?.trustedConnection,
          trustServerCertificate:
            defaultConfig.apps?.quiron?.database?.options
              ?.trustServerCertificate,
        },
      },
      webhooks: {
        uploadAppointments:
          options.uploadwebhook ||
          defaultConfig.apps?.quiron?.webhooks?.uploadAppointments,
      },
    };
  }

  Logger.log(await createGlobalConfig(newConfig));
};

export {
  revealConfigFile,
  previewConfigFile,
  removeConfigFile,
  createConfigFile,
};
