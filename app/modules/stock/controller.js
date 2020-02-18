import { errorMessage, getContent, NotFoundError } from 'iyasunday';
import moment from 'moment';

export async function ticker(req, res) {
  try {
    let { limit, symbolFilter } = req.query;

    // Get tickers' list
    let tickers = await getContent({
      url:
        process.env.FINANCIAL_MODEL_API_URL +
        `/search?query=${symbolFilter}&limit=${limit}&exchange=NASDAQ`,
    });

    tickers.sort((a, b) => (a.symbol > b.symbol ? 1 : -1));
    // Get and attach prices
    let symbols = '';
    for (let { symbol } of tickers) symbols += symbol + ',';

    let prices = await getContent({
      url: process.env.FINANCIAL_MODEL_API_URL + `/quote/${symbols}`,
    });

    prices.sort((a, b) => (a.symbol > b.symbol ? 1 : -1));

    const data = [];
    for (let i = 0; i < prices.length; i++)
      data[i] = { ...tickers[i], ...prices[i] };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  }
}

export async function priceHistory(req, res) {
  try {
    const format = 'YYYY-MM-DD';

    const {
        fromDate = void 0,
        toDate = void 0,
        daysAgo = 0,
        weeksAgo = 0,
        monthsAgo = 0,
        yearsAgo = 0,
      } = req.query,
      to = toDate ? moment(toDate).format(format) : moment().format(format),
      symbol = req.params.symbol.toUpperCase();

    let from;
    if (fromDate) from = moment(fromDate).format(format);
    else if (daysAgo > 0)
      from = moment()
        .subtract(daysAgo, 'days')
        .format(format);
    else if (weeksAgo > 0)
      from = moment()
        .subtract(weeksAgo, 'weeks')
        .format(format);
    else if (monthsAgo > 0)
      from = moment()
        .subtract(monthsAgo, 'months')
        .format(format);
    else if (yearsAgo > 0)
      from = moment()
        .subtract(yearsAgo, 'years')
        .format(format);
    else
      from = moment()
        .subtract(1, 'months')
        .format(format);

    const history = await getContent({
      url:
        process.env.FINANCIAL_MODEL_API_URL +
        `/historical-price-full/${symbol}?from=${from}&to=${to}`,
    });

    if (!history.historical || history.historical.length === 0)
      throw new NotFoundError(symbol + ' price history not found');

    res.status(200).json({
      success: true,
      data: history.historical,
    });
  } catch (err) {
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  }
}
