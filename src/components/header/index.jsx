import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';

import { MATCHES_AND_SCORES_PATH, PRONOSTICS_PATH, ROOT_PATH } from 'constants/route-paths';
import authActions from 'actions/auth-actions';
import { useIsAuthenticated } from 'hooks';

const Header = () => {
  const dispath = useDispatch();
  const isAuthenticated = useIsAuthenticated();

  const handleClickSignOut = () => dispath(authActions.signOut());
  return (
    <Row as={'header'} className={styles.container}>
      <Col as={NavLink} to={ROOT_PATH} className={styles.nav_link}>
        Répartiteurs
      </Col>
      <Col as={NavLink} to={ROOT_PATH} className={styles.nav_link}>
        Cotes
      </Col>
      <Col as={NavLink} to={PRONOSTICS_PATH} className={styles.nav_link}>
        Pronostics
      </Col>
      <Col as={NavLink} to={MATCHES_AND_SCORES_PATH} className={styles.nav_link}>
        Matches & Scores
      </Col>
      <Col as={NavLink} to={ROOT_PATH} className={styles.nav_link}>
        Analyse Confidentielle Foot
      </Col>
      {isAuthenticated && (
        <Col>
          <Button onClick={handleClickSignOut}>Sign Out</Button>
        </Col>
      )}
    </Row>
  );
};
export default Header;
