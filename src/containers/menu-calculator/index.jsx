import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import styles from './index.module.scss';

const MenuCalculator = () => (
  <div className={styles.container}>
    <h1 className={styles.header}>Répartiteurs && Couvertures</h1>

    <Row className={styles.menu_section}>
      <Col className={styles.menu_title}>
        <h2>Avantage-2 Chances</h2>
        <p>Sans seuil minimum cotes</p>
      </Col>
      <Col>
        <Button variant='outline-dark' className={styles.item}>
          <span>1 Gagnant, 1 Remboursé</span>
          <span>(2 signes)</span>
        </Button>
        <Button variant='outline-dark' className={styles.item}>
          <span>2 Gagnants - Double chance</span>
          <span>(2 signes)</span>
        </Button>
      </Col>
    </Row>

    <Row className={styles.menu_section}>
      <Col className={styles.menu_title}>
        <h2>Surebet</h2>
        <p>Avec seuil minimum cotes</p>
      </Col>
      <Col>
        <Button variant='outline-dark' className={styles.item}>
          <span>3 Gagnants</span>
          <span>(3 signes)</span>
        </Button>
        <Button variant='outline-dark' className={styles.item}>
          <span>2 Gagnants</span>
          <span>(2 signes)</span>
        </Button>
        <Button variant='outline-dark' className={styles.item}>
          <span>2 Gagnant, 1 Remboursé</span>
          <span>(3 signes)</span>
        </Button>
        <Button variant='outline-dark' className={styles.item}>
          <span>1 Gagnant, 2 Remboursé</span>
          <span>(3 signes)</span>
        </Button>
      </Col>
    </Row>

    <Row className={styles.menu_section}>
      <Col className={styles.menu_title}>
        <h2>Optimisation</h2>
        <p>Bénefice ou Mise</p>
        <p>Avec ou sans seuil cotes</p>
      </Col>
      <Col>
        <Button variant='outline-dark' className={styles.item}>
          <span>1 Gagnant, 1 Remboursé, 1 Selon Mise</span>
          <span>(3 signes)</span>
        </Button>
        <Button variant='outline-dark' className={styles.item}>
          <span>1 Gagnant, 1 Remboursé, 1 Selon Bénef</span>
          <span>(2 signes)</span>
        </Button>
      </Col>
    </Row>

    <Row className={styles.menu_section}>
      <Col className={styles.menu_title}>
        <h2>Outils</h2>
        <p>Evaluations</p>
      </Col>
      <Col>
        <Button variant='outline-dark' className={styles.item}>
          <span>Calcul probabilité && Valuebet</span>
          <span>(2, 3 signes)</span>
        </Button>
        <Button variant='outline-dark' className={styles.item}>
          <span>Calcul marge bookmaker</span>
          <span>(2, 3 signes)</span>
        </Button>
      </Col>
    </Row>
  </div>
);

export default MenuCalculator;
