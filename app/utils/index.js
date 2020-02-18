'use strict';
import intrinioSDK from 'intrinio-sdk';
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey =
  process.env.INTRINIO_API_KEY;
import yahoo from 'yahoo-finance';

export async function getTicker(
  identifier,
  options = {
    startDate: new Date('2019-01-01'),
    endDate: new Date(),
    frequency: 'daily',
    pageSize: 100,
    nextPage: null,
  }
) {
  try {
    identifier = identifier.toUpperCase();
    const securityAPI = new intrinioSDK.SecurityApi();
    const stockData = await securityAPI.getSecurityStockPrices(
      identifier,
      options
    );
    return stockData;
  } catch (err) {
    throw err;
  }
}
