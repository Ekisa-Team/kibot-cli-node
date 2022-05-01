import chalk from "chalk";

const log = (message?: any, ...optionalParams: any[]) => {
  const msg = [message, ...optionalParams];
  console.log(chalk(msg));
};

const success = (message?: any, ...optionalParams: any[]) => {
  const msg = [message, ...optionalParams];
  console.log(chalk.green.bold(msg));
};

const info = (message?: any, ...optionalParams: any[]) => {
  const msg = [message, ...optionalParams];
  console.info(chalk.blue.bold(msg));
};

const warn = (message?: any, ...optionalParams: any[]) => {
  const msg = [message, ...optionalParams];
  console.warn(chalk.yellow.bold(msg));
};

const error = (message?: any, ...optionalParams: any[]) => {
  const msg = [message, ...optionalParams];
  console.error(chalk.red.bold(msg));
};

const table = console.table;

const Logger = { log, success, info, warn, error, table };

export { Logger };
