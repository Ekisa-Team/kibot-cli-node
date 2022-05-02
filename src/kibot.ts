#!/usr/bin/env node

import { Command } from "commander";
import * as cmd from "./cmd";

// initialize cli
const program = new Command();

// commands
program.addCommand(cmd.config());
program.addCommand(cmd.db());
program.addCommand(cmd.appointments());

// parse arguments
program.parse(process.argv);
