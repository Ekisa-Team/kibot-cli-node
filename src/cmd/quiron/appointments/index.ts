import { Command } from "commander";
import {
  listAppointments,
  prepareAppointments,
  uploadAppointments,
} from "./query";

export const appointments = (): Command => {
  const cmd = new Command("appointments");

  cmd.addCommand(
    new Command("list")
      .option(
        "-f --format <format>",
        "display data in JSON or Table format",
        "json"
      )
      .action(listAppointments)
  );

  cmd.addCommand(new Command("prepare").action(prepareAppointments));

  cmd.addCommand(new Command("upload").action(uploadAppointments));

  return cmd;
};
