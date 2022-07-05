import React, { useRef, useState } from 'react';
import { Button, Col, Form, Row, Tab, Table, Tabs } from 'react-bootstrap';
import get from 'lodash/get';

import styles from './index.module.scss';

import { calculateCommissionBookmaker2Signals, calculateCommissionBookmaker3Signals } from 'utils/calculator';
import { displayPercentage } from 'utils/number';

export default function Tempalate6() {
  const ratingA = useRef();
  const ratingB = useRef();
  const ratingC = useRef();
  const ratingA1 = useRef();
  const ratingB1 = useRef();

  const [calculation3Signals, setCalculation3Signals] = useState({});
  const [calculation2Signals, setcalculation2Signals] = useState({});

  const handleClickSubmitValuebet3Signals = (event) => {
    event.preventDefault();

    const valueRatingA = parseFloat(get(ratingA.current, 'value', 0));
    const valueRatingB = parseFloat(get(ratingB.current, 'value', 0));
    const valueRatingC = parseFloat(get(ratingC.current, 'value', 0));
    setCalculation3Signals(calculateCommissionBookmaker3Signals(valueRatingA, valueRatingB, valueRatingC));
  };

  const handleClickSubmitValuebet2Signals = (event) => {
    event.preventDefault();

    const valueRatingA = parseFloat(get(ratingA1.current, 'value', 0));
    const valueRatingB = parseFloat(get(ratingB1.current, 'value', 0));

    setcalculation2Signals(calculateCommissionBookmaker2Signals(valueRatingA, valueRatingB));
  };

  return (
    <Tabs defaultActiveKey='0' className='mb-3'>
      <Tab eventKey='0' title='Valuebet 3 Signes'>
        <div className={styles.header}>
          <h3>Valuebet</h3>
          <h3>3 Signes</h3>
        </div>
        <Form className={styles.form_container} onSubmit={handleClickSubmitValuebet3Signals}>
          <h4>Calcul de la commission du bookmaker</h4>
          <Row className={styles.form_group}>
            <Col md={6}>Cote du signe &quot;A&quot;:</Col>
            <Col ref={ratingA} as={Form.Control} type='number' step='any' placeholder='Cote du signe "A"' required />
          </Row>
          <Row className={styles.form_group}>
            <Col md={6}>Cote du signe &quot;B&quot;:</Col>
            <Col ref={ratingB} as={Form.Control} type='number' step='any' placeholder='Cote du signe "B"' required />
          </Row>
          <Row className={styles.form_group}>
            <Col md={6}>Cote du signe &quot;C&quot;:</Col>
            <Col ref={ratingC} as={Form.Control} type='number' step='any' placeholder='Cote du signe "C"' required />
          </Row>

          <Row>
            <Col md={6}>
              <h4>Calculateur</h4>
            </Col>
            <Col>
              <Button variant='primary' type='submit'>
                VALIDER
              </Button>
            </Col>
          </Row>
        </Form>

        <Table responsive>
          <tbody>
            <tr>
              <td>Taux de versement :</td>
              <td>{displayPercentage(calculation3Signals.mTauxRendement)}</td>
            </tr>
            <tr>
              <td>Commission bookmaker :</td>
              <td>{displayPercentage(calculation3Signals.mCommissionBookmaker)}</td>
            </tr>
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey='1' title='Valuebet 2 Signes'>
        <div className={styles.header}>
          <h3>Valuebet</h3>
          <h3>2 Signes</h3>
        </div>
        <Form className={styles.form_container} onSubmit={handleClickSubmitValuebet2Signals}>
          <h4>Calcul de la commission du bookmaker</h4>
          <Row className={styles.form_group}>
            <Col md={6}>Cote du signe &quot;A&quot;:</Col>
            <Col ref={ratingA1} as={Form.Control} type='number' step='any' placeholder='Cote du signe "A"' required />
          </Row>
          <Row className={styles.form_group}>
            <Col md={6}>Cote du signe &quot;B&quot;:</Col>
            <Col ref={ratingB1} as={Form.Control} type='number' step='any' placeholder='Cote du signe "B"' required />
          </Row>

          <Row>
            <Col md={6}>
              <h4>Calculateur</h4>
            </Col>
            <Col>
              <Button variant='primary' type='submit'>
                VALIDER
              </Button>
            </Col>
          </Row>
        </Form>
        <Table responsive>
          <tbody>
            <tr>
              <td>Taux de versement :</td>
              <td>{displayPercentage(calculation2Signals.mTauxRendement)}</td>
            </tr>
            <tr>
              <td>Commission bookmaker :</td>
              <td>{displayPercentage(calculation2Signals.mCommissionBookmaker)}</td>
            </tr>
          </tbody>
        </Table>
      </Tab>
    </Tabs>
  );
}
