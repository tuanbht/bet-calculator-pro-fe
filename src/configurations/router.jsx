import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import NotFound from 'containers/not-found';
import {
  ROOT_PATH,
  NOT_FOUND_PATH,
  SIGN_IN_PATH,
  MATCHES_AND_SCORES_PATH,
  PRONOSTICS_PATH,
  MENU_CALCULATOR_PATH,
  ODDS_PATH,
  STATISTIC_PRONOSTICS_PATH,
  REPORTS_PATH,
  CALCULATOR_PATH,
} from 'constants/route-paths';
import ContainerLayout from 'components/container-layout';
import MatchesAndScores from 'containers/matches-and-scores';
import SignInPage from 'containers/sign-in';
import { useIsAuthenticated } from 'hooks';
import Pronostics from 'containers/pronostics';
import HomePage from 'containers/home';
import DispatchersPage from 'containers/menu-calculator';
import OddsPage from 'containers/odds';
import PronosticStatistics from 'containers/statistic-pronostics';
import Report from 'containers/report';
import Calculator from 'containers/calculator';

const ROUTES = [
  {
    path: ROOT_PATH,
    exact: true,
    container: HomePage,
  },
  {
    path: MENU_CALCULATOR_PATH,
    exact: true,
    container: DispatchersPage,
  },
  {
    path: ODDS_PATH,
    exact: true,
    container: OddsPage,
  },
  {
    path: PRONOSTICS_PATH,
    exact: true,
    container: Pronostics,
  },
  {
    path: MATCHES_AND_SCORES_PATH,
    exact: true,
    container: MatchesAndScores,
  },
  {
    path: STATISTIC_PRONOSTICS_PATH,
    exact: true,
    container: PronosticStatistics,
  },
  {
    path: REPORTS_PATH,
    exact: true,
    container: Report,
  },
  {
    path: CALCULATOR_PATH,
    exact: true,
    container: Calculator,
  },
];

const RouteValidation = ({ container, ...props }) => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: SIGN_IN_PATH,
          state: {
            from: location.pathname,
          },
        }}
      />
    );
  } else {
    return <ContainerLayout container={container} {...props} />;
  }
};

RouteValidation.propTypes = {
  container: PropTypes.elementType,
};

const Router = () => (
  <Switch>
    {ROUTES.map(({ path, container, ...routeConfig }) => (
      <Route
        {...routeConfig}
        key={path}
        path={path}
        render={(props) => <RouteValidation container={container} {...props} {...routeConfig} />}
      />
    ))}

    <Route exact path={SIGN_IN_PATH} render={(props) => <ContainerLayout container={SignInPage} {...props} />} />
    <Route exact path={NOT_FOUND_PATH} render={(props) => <ContainerLayout container={NotFound} {...props} />} />
    <Route render={() => <Redirect to={NOT_FOUND_PATH} />} />
  </Switch>
);

export default Router;
