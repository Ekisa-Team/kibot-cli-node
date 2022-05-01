import { Command } from "commander";
import {
  listAppointments,
  prepareAppointments,
  uploadAppointments,
} from "./query";

export const appointments = (): Command => {
  const cmd = new Command("appointments");

  cmd
    .command("list")
    .option("-f --format <format>", "display format in JSON or Table", "json")
    .action(listAppointments);

  cmd.command("prepare").action(prepareAppointments);
  cmd.command("upload").action(uploadAppointments);

  return cmd;
};
