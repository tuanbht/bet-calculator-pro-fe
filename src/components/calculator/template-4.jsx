import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import get from 'lodash/get';
import { useParams } from 'react-router-dom';
import { noop } from 'lodash';

import styles from './index.module.scss';

import { calculateMiniRisk1, calculateMiniRisk2 } from 'utils/calculator';
import { displayPercentage, displayPrice } from 'utils/number';

export default function Tempalate4() {
  const { type } = useParams();

  const mapping = {
    6: {
      title: 'Réajustement Surebet et/ou optimisation mise',
      calculateFunc: calculateMiniRisk1,
    },
    7: {
      title: 'Réajustement Surebet et/ou optimisation bénéfice',
      calculateFunc: calculateMiniRisk2,
    },
  };

  const totalBet = useRef();
  const ratingA = useRef();
  const ratingB = useRef();
  const ratingC = useRef();
  const testValue = useRef();

  const [calculation, setCalculation] = useState({});

  const handleClickSubmit = (event) => {
    event.preventDefault();

    const valueBet = parseFloat(get(totalBet.current, 'value', 0));
    const valueRatingA = parseFloat(get(ratingA.current, 'value', 0));
    const valueRatingB = parseFloat(get(ratingB.current, 'value', 0));
    const valueRatingC = parseFloat(get(ratingC.current, 'value', 0));
    const valueTestValue = parseFloat(get(testValue.current, 'value', 0));

    const calculateFunc = mapping[type].calculateFunc || noop;

    setCalculation(calculateFunc(valueBet, valueRatingA, valueRatingB, valueRatingC, valueTestValue));
  };

  return (
    <div>
      <div className={styles.header}>
        <h3>Mini Risque perte partielle sur 1 signe</h3>
        <h3>3 Signes</h3>
      </div>
      <Form className={styles.form_container} onSubmit={handleClickSubmit}>
        <Row className={styles.form_group}>
          <Col md={6}>Mise Totale:</Col>
          <Col
            ref={totalBet}
            as={Form.Control}
            type='number'
            step='any'
            placeholder='Mise Totale'
            defaultValue={10}
            required
          />
        </Row>
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
        <Row className={styles.form_group}>
          <Col md={6}>{mapping[type].title}</Col>
          {type === '6' ? (
            <Col
              ref={testValue}
              as={Form.Control}
              type='number'
              step='any'
              required
            />
          ) : (
            <InputGroup className='col px-0'>
              <FormControl ref={testValue} />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
          )}
          <i>
            Testez différentes valeurs en hausse jusqu&apos;à obtenir le résultat positif &apos;A&apos; souhaité en
            admettant une perte plus ou moins modérée sur le signe &apos;C&apos; :
          </i>
        </Row>
        <Row className={classNames(styles.form_group, styles.form_result)}>
          <Col md={6}>Indice Surebet:</Col>
          <Col>{calculation.mIndiceSurebet?.toFixed(5)}</Col>
          {calculation.mIndiceSurebet && (
            <span className='text-danger'>Attention, cotes insuffisantes pour un Surebet</span>
          )}
        </Row>

        <Row>
          <Col md={6}>
            <h4>Répartiteurs</h4>
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
            <th>Répartition de la mise</th>
            <th>Mise Exacte</th>
            <th>Mise Arrondie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Placez sur votre signe &quot;A&quot; (à Gagner) :</td>
            <td>{displayPrice(calculation.mMiseA)}</td>
            <td>{displayPrice(calculation.mMiseAArr)}</td>
          </tr>
          <tr>
            <td>Placez sur votre signe &quot;B&quot; (à Rembourser) :</td>
            <td>{displayPrice(calculation.mMiseB)}</td>
            <td>{displayPrice(calculation.mMiseBArr)}</td>
          </tr>
          <tr>
            <td>Placez sur votre signe &quot;C&quot; (Perte acceptée) :</td>
            <td>{displayPrice(calculation.mMiseC)}</td>
            <td>{displayPrice(calculation.mMiseCArr)}</td>
          </tr>
          <tr>
            <td>Mise Finale :</td>
            <td>{displayPrice(calculation.mMiseFinale)}</td>
            <td>{displayPrice(calculation.mMiseFinaleArr)}</td>
          </tr>
        </tbody>
      </Table>
      <Table responsive>
        <thead>
          <tr>
            <th>Résultats Financiers</th>
            <th colSpan={3}>Résultats Exacts</th>
            <th colSpan={3}>Résultats Arrondis</th>
          </tr>
          <tr>
            <th></th>
            <th>Gains</th>
            <th>Bénéfices</th>
            <th>Rendement</th>
            <th>Gains</th>
            <th>Bénéfices</th>
            <th>Rendement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Si le signe &quot;A&quot; gagne :</td>
            <td>{displayPrice(calculation.mGainA)}</td>
            <td>{displayPrice(calculation.mBeneficeA)}</td>
            <td>{displayPercentage(calculation.mRendementA)}</td>
            <td>{displayPrice(calculation.mGainAArr)}</td>
            <td>{displayPrice(calculation.mBeneficeAArr)}</td>
            <td>{displayPercentage(calculation.mRendementAArr)}</td>
          </tr>
          <tr>
            <td>Si le signe &quot;B&quot; gagne :</td>
            <td>{displayPrice(calculation.mGainB)}</td>
            <td>{displayPrice(calculation.mBeneficeB)}</td>
            <td>{displayPercentage(calculation.mRendementB)}</td>
            <td>{displayPrice(calculation.mGainBArr)}</td>
            <td>{displayPrice(calculation.mBeneficeBArr)}</td>
            <td>{displayPercentage(calculation.mRendementBArr)}</td>
          </tr>
          <tr>
            <td>Si le signe &quot;C&quot; gagne :</td>
            <td>{displayPrice(calculation.mGainC)}</td>
            <td>{displayPrice(calculation.mBeneficeC)}</td>
            <td>{displayPercentage(calculation.mRendementC)}</td>
            <td>{displayPrice(calculation.mGainCArr)}</td>
            <td>{displayPrice(calculation.mBeneficeCArr)}</td>
            <td>{displayPercentage(calculation.mRendementCArr)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
