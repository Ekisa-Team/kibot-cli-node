import chalk from "chalk";

const log = (...message: string[]) => {
  console.log(...message);
};

const success = (...message: string[]) => {
  console.log(chalk.green(...message));
};

const info = (...message: string[]) => {
  console.info(chalk.blue(...message));
};

const warn = (...message: string[]) => {
  console.warn(chalk.yellow(...message));
};

const error = (...message: string[]) => {
  console.error(chalk.red(...message));
  return process.exit(1);
};

const json = (object: any) => {
  console.log(JSON.stringify(object, null, 2));
};

const table = (object: any) => {
  console.table(object);
};

const Logger = { log, success, info, warn, error, json, table };

export { Logger };
