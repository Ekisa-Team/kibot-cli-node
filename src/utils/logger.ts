import chalk from "chalk";

const log = (message: string) => {
  console.log(message);
};

const success = (message: string) => {
  console.log(chalk.green.bold(message));
};

const info = (message: string) => {
  console.info(chalk.blue.bold(message));
};

const warn = (message: string) => {
  console.warn(chalk.yellow.bold(message));
};

const error = (message: string) => {
  console.error(chalk.red.bold(message));
  return process.exit(1);
};

const Logger = { log, success, info, warn, error };

export { Logger };
