import { Command } from "commander";
import {
  createConfigFile,
  previewConfigFile,
  removeConfigFile,
  revealConfigFile,
} from "./query";

export const config = (): Command => {
  const cmd = new Command("config");

  cmd.addCommand(new Command("reveal").action(revealConfigFile));

  cmd.addCommand(new Command("preview").action(previewConfigFile));

  cmd.addCommand(new Command("remove").action(removeConfigFile));

  cmd.addCommand(
    new Command("create")
      .arguments("<app>")
      .option("-c --client <client>", "Client ID")
      .option("-db --database <database>", "Database name")
      .option("-s --server <server>", "Server instance name")
      .option("-usr --user <user>", "Username")
      .option("-pwd --password <password>", "Password")
      .option(
        "-uw --uploadwebhook <upload-webhook>",
        "Webhook to upload appointments"
      )
      .action(createConfigFile)
  );

  return cmd;
};
