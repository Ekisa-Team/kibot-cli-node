import { Command } from "commander";
import { testDatabaseConnection } from "./query";

export const db = (): Command => {
  const cmd = new Command("db");

  cmd.addCommand(new Command("test").action(testDatabaseConnection));

  return cmd;
};
