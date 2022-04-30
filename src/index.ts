#!/usr/bin/env node

import { Command } from "commander";
import * as cmd from "./cmd";

// initialize program
const program = new Command();

// commands
program.addCommand(cmd.testDB());
program.addCommand(cmd.appointments());

// parse arguments
program.parse(process.argv);
