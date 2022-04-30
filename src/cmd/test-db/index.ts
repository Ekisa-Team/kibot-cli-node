import { Command } from "commander";
import { testDatabaseConnection } from "./query";

export const testDB = (): Command =>
  new Command("test-db").action(testDatabaseConnection);
