import { readFileSync } from "fs";
import { writeFile } from "fs/promises";
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

const defaultConfig: CLIConfig = {
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
        uploadAppointments:
          "https://kibot-quiron-middleware.azurewebsites.net/api/chatbotcita/create",
      },
    },
  },
};

const configFilename = ".kibot-config.json";

/**
 * Reads global CLI config
 * @returns CLI config
 */
export function readGlobalConfig(): CLIConfig | undefined {
  try {
    const home = homedir();
    if (!home) {
      throw new Error("No home directory found.");
    }

    const configPath = join(home, configFilename);
    return JSON.parse(readFileSync(configPath, "utf8"));
  } catch (error) {
    Logger.error(error as string);
  }
}

/**
 * Creates JSON structure with the CLI global config
 * @returns config file path
 */
export async function createGlobalConfig() {
  try {
    const home = homedir();
    if (!home) {
      throw new Error("No home directory found.");
    }

    const configPath = join(home, configFilename);
    await writeFile(configPath, JSON.stringify(defaultConfig));

    return configPath;
  } catch (error) {
    Logger.error(error as string);
  }
}
