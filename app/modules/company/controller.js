import { NotFoundError, errorMessage, getContent } from 'iyasunday';
import yahooFinance from 'yahoo-finance';

export async function profile(req, res) {
  try {
    const { symbol } = req.params;
    let profile = getContent({
        url: process.env.FINANCIAL_MODEL_API_URL + '/company/profile/' + symbol,
      }),
      yahooProfile = yahooFinance.quote(symbol, ['summaryProfile']);

    [profile, yahooProfile] = await Promise.all([profile, yahooProfile]);

    if (!profile && !yahooProfile)
      throw new NotFoundError(
        symbol + ' profile not found, kindly cross-check your spelling'
      );

    profile.symbol = symbol.toUpperCase();
    res.status(200).json({
      success: true,
      data: { ...profile.profile, ...yahooProfile.summaryProfile },
    });
  } catch (err) {
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  }
}

export async function recommendationTrend(req, res) {
  try {
    const { symbol } = req.params;
    const { recommendationTrend = void 0 } = await yahooFinance.quote(symbol, [
      'recommendationTrend',
    ]);

    if (!recommendationTrend)
      throw new NotFoundError('No recommended trend found for ' + symbol);

    res.status(200).json({
      success: true,
      data: recommendationTrend,
    });
  } catch (err) {
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  }
}

export async function earning(req, res) {
  try {
    const { symbol } = req.params;
    const { earnings = void 0 } = await yahooFinance.quote(symbol, [
      'earnings',
    ]);

    if (!earnings) throw new NotFoundError(symbol + ' earnings not found');

    res.status(200).json({
      success: true,
      data: earnings,
    });
  } catch (err) {
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  }
}

export async function statistics(req, res) {
  try {
    const { symbol } = req.params;
    const { defaultKeyStatistics = void 0 } = await yahooFinance.quote(symbol, [
      'defaultKeyStatistics',
    ]);

    if (!defaultKeyStatistics)
      throw new NotFoundError(symbol + ' statistics not found');

    res.status(200).json({
      success: true,
      data: defaultKeyStatistics,
    });
  } catch (err) {
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  }
}
