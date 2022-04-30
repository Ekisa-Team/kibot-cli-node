#!/usr/bin/env node

import { Command } from "commander";
import { makeAppointmentsCmd } from "./cmd";

// initialize program
const program = new Command();

// commands
program.addCommand(makeAppointmentsCmd());

// parse arguments
program.parse(process.argv);
