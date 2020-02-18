## Prerequisites
1. [Node js 12](https://nodejs.org/en/download/)
2. [Postman](https://www.getpostman.com/) To test the endpoints
3. Any text Editor
4. [Git](https://git-scm.com/downloads)
5. [Docker](https://docs.docker.com/)

## Installation
Clone this project, cd into project folder and run:

```shell
//Using yarn
yarn
yarn prod

//Using npm
npm i
npm run prod

//using docker
docker build -t modusbox ./
docker run -p 4040:4040 modusbox
```
##.env file sample
```
NODE_ENV=
PORT=
API_VERSION=
API_URL=
INTRINIO_API_KEY=
ALPHA_VANTAGE_API_KEY=
FINANCIAL_MODEL_API_URL=
```

## Test
Test is written for only room category 
```shell
//using yarn
yarn test

//using npm
npm run test
```

## App featutes Features
- List stock tickers and prices
    - Filter by symbol
    - Limit returned result
- Show company stock price history 
    - show history based on provided date range
    - show history by number of days, weeks, months and years specified by user
- Show company detailed profile
- Show company recommended trend
- Show company earnings
- Show company statistics


