import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from 'containers/home-page';
import NotFound from 'containers/not-found';
import { ROOT_PATH, NOT_FOUND_PATH, SIGN_IN_PATH, MATCHES_AND_SCORES_PATH } from 'constants/route-paths';
import ContainerLayout from 'components/container-layout';
import MatchesAndScores from 'containers/matches-and-scores';
import SignInPage from 'containers/sign-in';
import { useIsAuthenticated } from 'hooks';

const ROUTES = [
  {
    path: ROOT_PATH,
    exact: true,
    container: HomePage,
  },
  {
    path: MATCHES_AND_SCORES_PATH,
    exact: true,
    container: MatchesAndScores,
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
