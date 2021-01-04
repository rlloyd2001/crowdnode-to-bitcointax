/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import moment from 'moment';
import logger from './logger';
import { parseCsv } from './parse-csv';
import { stringifyCsv } from './stringify-csv';

logger.info('starting app', { arguments: process.argv });

const crowdnodeToBitcoinTaxDate = (value: string): string => {
  return moment(value, 'M/D/YYYY').format('YYYY-MM-DD');
};

const transformCrowdnode = (input: string[][], year: string): string[][] => {
  input = input.filter((row) => {
    return row[3].indexOf(year) > -1;
  });
  input = input.filter((row) => {
    return row[0] === 'Fee' || row[0] === 'Dividend';
  });
  const map = new Map<string, number>();
  for (let i = 0; i < input.length; i += 1) {
    const row = input[i];
    const key = crowdnodeToBitcoinTaxDate(row[3]);
    if (map.has(key)) {
      map.set(key, (map.get(key) as any) + Number(row[1]));
    } else {
      map.set(key, Number(row[1]));
    }
  }
  const retval = [['Date', 'Action', 'Symbol', 'Volume']];
  for (const [key, value] of map) {
    retval.push([key, 'MINING', 'DASH', Number(value).toFixed(10)]);
  }
  return retval;
};

async function main(): Promise<void> {
  const inputFName = process.argv[2];
  const outputFName = process.argv[3];
  const year = process.argv[4];

  const inputData = fs.readFileSync(inputFName).toString();
  logger.info('main', { inputDataLength: inputData.length });
  const inputCsv = await parseCsv(inputData);
  logger.info('main', { inputCsvFirstRows: [...inputCsv].slice(0, 10) });
  const outputCsv = transformCrowdnode(inputCsv, year);
  logger.info('main', { outputCsvFirstRows: [...outputCsv].slice(0, 10) });
  const outputData = await stringifyCsv(outputCsv);
  logger.info('main', { outputData });
  fs.writeFileSync(outputFName, outputData);
}

main().then(() => {
  logger.info('ending app');
});
