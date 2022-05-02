import chalk from "chalk";
import { existsSync, readFileSync } from "fs";
import { unlink, writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { Logger } from "./logger";

export type CLIConfig = {
  apps?: {
    quiron?: {
      client?: number;
      database?: {
        server?: string;
        database?: string;
        user?: string;
        password?: string;
        options?: {
          trustedConnection?: true;
          trustServerCertificate?: true;
        };
      };
      webhooks?: {
        uploadAppointments?: string;
      };
    };
  };
};

export const defaultConfig: CLIConfig = {
  apps: {
    quiron: {
      client: 0,
      database: {
        server: "",
        database: "",
        user: "",
        password: "",
        options: {
          trustedConnection: true,
          trustServerCertificate: true,
        },
      },
      webhooks: {
        uploadAppointments: "https://some-url.com",
      },
    },
  },
};

const configFilename = ".kibot-config.json";

/**
 * Get global CLI config path
 * @returns CLI config path
 */
export function getGlobalConfigPath(): string {
  try {
    const home = homedir();
    if (!home) {
      throw new Error("No home directory found.");
    }

    const configPath = join(home, configFilename);
    return configPath;
  } catch (error) {
    return Logger.error(error as string);
  }
}

/**
 * Reads global CLI config
 * @returns CLI config
 */
export function readGlobalConfig(): CLIConfig | undefined {
  try {
    const configPath = getGlobalConfigPath();

    if (!existsSync(configPath)) {
      Logger.warn("Config file wasn't found");
      process.exit(0);
    }

    return JSON.parse(readFileSync(configPath, "utf8"));
  } catch (error) {
    return Logger.error(error as string);
  }
}

/**
 * Removes CLI global config
 * @returns config file path
 */
export async function removeGlobalConfig(): Promise<void> {
  try {
    const configPath = getGlobalConfigPath();

    if (!existsSync(configPath)) {
      Logger.warn("Config file wasn't found");
      process.exit(0);
    }

    await unlink(configPath);
  } catch (error) {
    Logger.error(error as string);
  }
}

/**
 * Creates JSON structure with the CLI global config
 * @returns config file path
 */
export async function createGlobalConfig(
  optionalConfig: CLIConfig = {}
): Promise<string> {
  try {
    const configPath = getGlobalConfigPath();

    await writeFile(
      configPath,
      JSON.stringify({ ...defaultConfig, ...optionalConfig }, null, 2)
    );

    return chalk.blue.underline(configPath);
  } catch (error) {
    return Logger.error(error as string);
  }
}
