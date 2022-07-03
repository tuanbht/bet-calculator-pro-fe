import React from 'react';
import { Button, Col, Row, NavLink as DirectLink } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';

import {
  MENU_CALCULATOR_PATH,
  MATCHES_AND_SCORES_PATH,
  REPORTS_PATH,
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
        <NavLink to={MENU_CALCULATOR_PATH} className={styles.nav_link}>
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
        <NavLink to={REPORTS_PATH} className={styles.nav_link}>
          Rappot Mensuel
        </NavLink>
      </Col>
      <Col className={styles.nav_link_wrapper}>
        <DirectLink href='//footvip.com' className={styles.nav_link}>
          Analyse Confidentielle Foot
        </DirectLink>
      </Col>
      <Col className={styles.nav_link_wrapper}>
        <DirectLink href='//www.score24.com/ls5/livescore.jsp?partner=expekt3&lang=eng' className={styles.nav_link}>
          Live Score
        </DirectLink>
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
