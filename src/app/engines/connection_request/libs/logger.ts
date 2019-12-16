import chalk from 'chalk';

// logger function
export default function(msg: string) {
  console.log(chalk.yellow(msg));
}
