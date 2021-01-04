import logger from './logger';
import * as fs from 'fs';
import { parseCsv } from './parse-csv';

logger.info('starting app', { arguments: process.argv });

async function main(): Promise<void> {
  const inputFName = process.argv[2];
  const outputFName = process.argv[3];
  const year = process.argv[4];

  const inputData = fs.readFileSync(inputFName).toString();
  logger.info('main', { inputData: inputData.slice(0, 100) });
  const inputCsv = await parseCsv(inputData);
  logger.info('main', { inputCsvLength: inputCsv.length });
}

main().then(() => {
  logger.info('ending app');
});
