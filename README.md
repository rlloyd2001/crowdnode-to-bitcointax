# Crowdnode To BitcoinTax

This script has saved me many hours of data entry for interest earned.
What this script does is take a .csv file from CrowdNode and create a .csv file that can be
uploaded into the Income section of bitcoin.tax.

Download excel file from crowdnode save it as a .csv to use with this script.

Not tested much. Review your generated .csv before uploading to bitcoin.tax to make sure it is what you are needing.

## Prerequisites
*   NodeJs (v14.x)
*   Npm

## Getting Started
*   ```npm install```
*   ```npm run build```
*   ```npm run start -- <crowdnode.csv file> <output.csv> <year>```

# Example
```bash
npm run start -- FundsOverview.csv output.csv 2020
```

## Donate with PayPal

Did you find this helpful? Leave a tip here.

### PayPal
https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=rlloyd2001%40gmail.com&currency_code=USD
