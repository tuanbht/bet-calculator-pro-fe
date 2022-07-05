import React, { useRef, useState } from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import get from 'lodash/get';

import styles from './index.module.scss';

import { calculateValuebet } from 'utils/calculator';
import { displayPercentage } from 'utils/number';

export default function Tempalate5() {
  const ratingA = useRef();
  const ratingB = useRef();
  const ratingC = useRef();
  const ratingA1 = useRef();
  const ratingB1 = useRef();
  const ratingC1 = useRef();

  const [calculation, setCalculation] = useState({});

  const handleClickSubmit = (event) => {
    event.preventDefault();

    const valueRatingA = parseFloat(get(ratingA.current, 'value', 0));
    const valueRatingB = parseFloat(get(ratingB.current, 'value', 0));
    const valueRatingC = parseFloat(get(ratingC.current, 'value', 0));
    const valueRatingA1 = parseFloat(get(ratingA1.current, 'value', 0));
    const valueRatingB1 = parseFloat(get(ratingB1.current, 'value', 0));
    const valueRatingC1 = parseFloat(get(ratingC1.current, 'value', 0));

    setCalculation(
      calculateValuebet(valueRatingA, valueRatingB, valueRatingC, valueRatingA1, valueRatingB1, valueRatingC1),
    );
  };

  const displayEstimation = (value) => (value >= 0 ? value.toFixed(2) : '');

  return (
    <div>
      <div className={styles.header}>
        <h3>Valuebet</h3>
        <h3>3 Signes</h3>
      </div>
      <Form className={styles.form_container} onSubmit={handleClickSubmit}>
        <h4>Calcul de l&apos;estimation du bookmaker</h4>
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
        <h4>Votre estimation sur la rencontre</h4>
        <Row className={styles.form_group}>
          <Col md={6}>Cote du signe &quot;A&quot;:</Col>
          <InputGroup className='col px-0'>
            <FormControl ref={ratingA1} type='number' step='any' placeholder='Cote du signe "A"' required />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </Row>
        <Row className={styles.form_group}>
          <Col md={6}>Cote du signe &quot;B&quot;:</Col>
          <InputGroup className='col px-0'>
            <FormControl ref={ratingB1} type='number' step='any' placeholder='Cote du signe "B"' required />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </Row>
        <Row className={styles.form_group}>
          <Col md={6}>Cote du signe &quot;C&quot;:</Col>
          <InputGroup className='col px-0'>
            <FormControl ref={ratingC1} type='number' step='any' placeholder='Cote du signe "C"' required />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
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
        <thead>
          <tr>
            <th colSpan={2}>Probabilité de chaque mise selon le bookmaker</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Probabilité du signe &quot;A&quot; :</td>
            <td>{displayPercentage(calculation.mProbabiliteA)}</td>
          </tr>
          <tr>
            <td>Probabilité du signe &quot;B&quot; :</td>
            <td>{displayPercentage(calculation.mProbabiliteB)}</td>
          </tr>
          <tr>
            <td>Probabilité du signe &quot;C&quot; :</td>
            <td>{displayPercentage(calculation.mProbabiliteC)}</td>
          </tr>
        </tbody>
      </Table>
      <Table responsive>
        <thead>
          <tr>
            <th colSpan={4}>Résultat Valuebet</th>
          </tr>
          <tr>
            <th></th>
            <th>Votre cote estimée</th>
            <th>Valuebet</th>
            <th>Taux du valuebet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Comparaison de votre estimation et de celle du bookmaker :</td>
            <td>{displayEstimation(calculation.mCoteEstimeeA)}</td>
            <td>{calculation.mValueBetA}</td>
            <td>{calculation.mCoteEstimeeA > 0 && displayPercentage(calculation.mTauxA)}</td>
          </tr>
          <tr>
            <td>Comparaison de votre estimation et de celle du bookmaker :</td>
            <td>{displayEstimation(calculation.mCoteEstimeeB)}</td>
            <td>{calculation.mValueBetB}</td>
            <td>{calculation.mCoteEstimeeB > 0 && displayPercentage(calculation.mTauxB)}</td>
          </tr>
          <tr>
            <td>Comparaison de votre estimation et de celle du bookmaker :</td>
            <td>{displayEstimation(calculation.mCoteEstimeeC)}</td>
            <td>{calculation.mValueBetC}</td>
            <td>{calculation.mCoteEstimeeC > 0 && displayPercentage(calculation.mTauxC)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
