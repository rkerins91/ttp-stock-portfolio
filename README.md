

## TTP-STOCK_PORTFOLIO APP

### To Run Locally

1. Clone repo to local machine
2. Create Postgres DB called 'stocks' (or change line 3 in './server/db/db' to reflect name of chosen db)
3. Create secrets.js file in root directory with a variable called JWTSECRET, assign it any string, (I chose 'mysecrettoken') and export it.
4. Create secrets.js file in client directory with a variable called ALPHAAPIKEY and assign it the api key provided by Alpha Vantage here [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)
5. 'npm i' in both root and client directories
6. 'npm run dev' to start
