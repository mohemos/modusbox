require('dotenv').config();
const { getContent } = require('iyasunday'),
  symbol = 'GOOG';
  jest.setTimeout(30000);
  
  test('test stock ticker', async () => {
    try {
      const { success } = await getContent({
        url: process.env.API_URL + '/companies/profile/'+symbol
      });
  
      expect(success).toBe(true);
    } catch (error) {
      expect(true).toBe(false);
    }
  });

  test('test company recommended trend', async () => {
    try {
      const { success } = await getContent({
        url: process.env.API_URL + '/companies/recommended-trend/'+symbol
      });
  
      expect(success).toBe(true);
    } catch (error) {
      expect(true).toBe(false);
    }
  });

  test('test company earnings', async () => {
    try {
      const { success } = await getContent({
        url: process.env.API_URL + '/companies/earnings/'+symbol
      });
  
      expect(success).toBe(true);
    } catch (error) {
      expect(true).toBe(false);
    }
  });

  test('test company statistics', async () => {
    try {
      const { success } = await getContent({
        url: process.env.API_URL + '/companies/statistics/'+symbol
      });
  
      expect(success).toBe(true);
    } catch (error) {
      expect(true).toBe(false);
    }
  });
