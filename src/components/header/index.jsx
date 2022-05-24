import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';

import {
  ANALYSIS_PATH,
  DISPATCHERS_PATH,
  MATCHES_AND_SCORES_PATH,
  ODDS_PATH,
  PRONOSTICS_PATH,
} from 'constants/route-paths';
import authActions from 'actions/auth-actions';
import { useIsAuthenticated } from 'hooks';

const Header = () => {
  const dispath = useDispatch();
  const isAuthenticated = useIsAuthenticated();

  const handleClickSignOut = () => dispath(authActions.signOut());

  return (
    <Row as={'header'} className={styles.container}>
      <Col className={styles.nav_link_wrapper}>
        <NavLink to={DISPATCHERS_PATH} className={styles.nav_link}>
          Répartiteurs
        </NavLink>
      </Col>
      <Col className={styles.nav_link_wrapper}>
        <NavLink to={ODDS_PATH} className={styles.nav_link}>
          Cotes
        </NavLink>
      </Col>
      <Col className={styles.nav_link_wrapper}>
        <NavLink to={PRONOSTICS_PATH} className={styles.nav_link}>
          Pronostics
        </NavLink>
      </Col>
      <Col className={styles.nav_link_wrapper}>
        <NavLink to={MATCHES_AND_SCORES_PATH} className={styles.nav_link}>
          Matches & Scores
        </NavLink>
      </Col>
      <Col className={styles.nav_link_wrapper}>
        <NavLink to={ANALYSIS_PATH} className={styles.nav_link}>
          Analyse Confidentielle Foot
        </NavLink>
      </Col>
      {isAuthenticated && (
        <Col className={styles.nav_link_wrapper}>
          <Button onClick={handleClickSignOut}>Sign Out</Button>
        </Col>
      )}
    </Row>
  );
};
export default Header;
