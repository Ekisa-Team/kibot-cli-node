import { Command } from "commander";

export const makeAppointmentsCmd = (): Command => {
  const cmd = new Command("appointments");

  cmd.command("list").action(() => {
    console.log("Listing appointments");
  });

  cmd.command("prepare").action(() => {
    console.log("Preparing appointments");
  });

  cmd.command("upload").action(() => {
    console.log("Uploading appointments");
  });

  return cmd;
};
