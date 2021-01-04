/**
 * @jest-environment node
 */
import logger from '../src/logger';
import { parseCsv } from '../src/parse-csv';

describe('transform', () => {
  it('transform crowdnode csv to bitcoin tax csv', async () => {
    const crowdnodeCsvData = `Type,Amount,Time,Time (UTC),TxId,Status
Fee,-1,1609653625,1/3/2021,12345,Valid
Dividend,2,1609653625,1/3/2021,12345,Valid
Fee,-1,1609448369,12/31/2020,12345,Valid
Dividend,2,1609448369,12/31/2020,12345,Valid
Deposit,2.62653462,1603842565,12/31/2020,12345,Valid
Dividend,2,1609437722,12/31/2020,12345,Valid
Fee,-1,1609437722,12/31/2020,12345,Valid`;
    const output = await parseCsv(crowdnodeCsvData);
    logger.info('', { output });
  });
});
