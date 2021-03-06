export const ROOT_PATH = '/';
export const NOT_FOUND_PATH = '/404';
export const SIGN_IN_PATH = '/sign-in';
export const MATCHES_AND_SCORES_PATH = '/matches-and-scores';
export const PRONOSTICS_PATH = '/pronostics';
export const STATISTIC_PRONOSTICS_PATH = '/statistic-pronostics';
export const MENU_CALCULATOR_PATH = '/calculator';
export const ODDS_PATH = '/odds';
export const REPORTS_PATH = '/reports';
export const CALCULATOR_PATH = '/calculator/:type';

export const buildCalculatorPath = (type) => `/calculator/${type}`;
