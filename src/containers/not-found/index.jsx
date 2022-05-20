import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from './index.module.scss';

import { ROOT_PATH } from 'constants/route-paths';

const NotFound = () => (
  <div className={styles.container}>
    <Row className='container'>
      <Col md={6} className={styles.content_section}>
        <p className='eyebrow-text'>Error 404</p>
        <div className={styles.group_link}>
          <Link to={ROOT_PATH} className={classnames('btn orange-btn', styles.btn_link)}>
            Home
          </Link>
        </div>
      </Col>
    </Row>
  </div>
);

export default NotFound;
