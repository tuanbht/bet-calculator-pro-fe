import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import styles from './index.module.scss';

import { MATCHES_AND_SCORES_PATH, ROOT_PATH } from 'constants/route-paths';

const Header = () => (
  <Row as={'header'} className={styles.container}>
    <Col as={NavLink} to={ROOT_PATH} className={styles.nav_link}>Répartiteurs</Col>
    <Col as={NavLink} to={ROOT_PATH} className={styles.nav_link}>Cotes</Col>
    <Col as={NavLink} to={ROOT_PATH} className={styles.nav_link}>Pronostics</Col>
    <Col as={NavLink} to={MATCHES_AND_SCORES_PATH} className={styles.nav_link}>Matches & Scores</Col>
    <Col as={NavLink} to={ROOT_PATH} className={styles.nav_link}>Analyse Confidentielle Foot </Col>
  </Row>
);

export default Header;
