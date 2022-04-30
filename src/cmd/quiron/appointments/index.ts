import { Command } from "commander";
import { listAppointments } from "./query";

export const appointments = (): Command => {
  const cmd = new Command("appointments");

  cmd
    .command("list")
    .option("-f --format <format>", "display format in JSON or Table", "json")
    .action(listAppointments);

  cmd.command("prepare").action(() => {
    console.log("Preparing appointments");
  });

  cmd.command("upload").action(() => {
    console.log("Uploading appointments");
  });

  return cmd;
};
