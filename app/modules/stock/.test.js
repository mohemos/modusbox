require('dotenv').config();
const { getContent } = require('iyasunday');

jest.setTimeout(30000);

test('test stock ticker', async () => {
  try {
    const { success } = await getContent({
      url: process.env.API_URL + '/stocks/tickers?symbolFilter=GO&limit=10'
    });

    expect(success).toBe(true);
  } catch (error) {
    expect(true).toBe(false);
  }
});

test('test stock history', async () => {
  try {
    const { success } = await getContent({
      url: process.env.API_URL + '/stocks/history/AAPL?fromDate=2020-01-10&toDate=2020-02-11'
    });

    expect(success).toBe(true);
  } catch (error) {
    expect(true).toBe(false);
  }
});

