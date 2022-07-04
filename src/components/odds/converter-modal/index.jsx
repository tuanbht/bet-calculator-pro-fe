import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Table } from 'react-bootstrap';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './index.module.scss';

import { formatDate } from 'utils/datetime';
import { calculateDistributor, calculateDoubleChance } from 'utils/calculator';
import { CONVERTER_TYPE } from 'constants/odd-modal';
import { buildCalculatorPath } from 'constants/route-paths';

export const useConverterModal = () => {
  const [show, setShow] = useState();
  const [match, setMatch] = useState({});
  const [type, setType] = useState();

  const openModal = (type, match) => {
    setShow(true);
    setMatch(match);
    setType(type);
  };

  const renderTableSection = (value1, value2) => {
    const bmk1 = get(match, `data.forAll.bmk${value1}`);
    const bmk2 = get(match, `data.forAll.bmk${value2}`);
    const best1 = get(match, `data.forAll.best${value1}`);
    const best2 = get(match, `data.forAll.best${value2}`);
    const calculator =
      type === CONVERTER_TYPE.DRAW_NO_BET
        ? calculateDistributor(10, best1, best2)
        : calculateDoubleChance(10, best1, best2);
    const title =
      type === CONVERTER_TYPE.DRAW_NO_BET
        ? `${value1} - Gagnant, ${value2} - Retour mise totale`
        : `${value1} ${value2} Gagnant`;
    const odd = type === CONVERTER_TYPE.DRAW_NO_BET ? calculator.mNouvelleCote : calculator.mCoteDoubleChance;

    const displayRedeem = (value) => (value === 0 ? '-' : `${(value * 100).toFixed(2)}%`);

    return (
      <>
        <tr>
          <th colSpan='5'>{title}</th>
          <th colSpan='3'>{value1 === '1' && value2 === 'X' ? 'Résultats Financiers 10 pts*' : ''}</th>
        </tr>
        <tr className={styles.sub_header}>
          <td>Bookmakers</td>
          <td>Signes à jouer</td>
          <td>Cote</td>
          <td>Taux de distribution mise</td>
          <td>Nouvelle Cote</td>
          <td>Gains</td>
          <td>Bénéfices</td>
          <td>Rendement</td>
        </tr>
        <tr>
          <td>{bmk1}</td>
          <td>{value1}</td>
          <td>{best1}</td>
          <td>{(calculator.mMiseA * 10).toFixed(2)}%</td>
          <td rowSpan='2'>
            <div className={styles.modal_odd}>{odd.toFixed(2)}</div>
          </td>
          <td>$ {Math.floor(calculator.mGainA).toFixed(0)}. pts</td>
          <td>$ {Math.floor(calculator.mBeneficeA).toFixed(0)}. pts</td>
          <td>{displayRedeem(calculator.mRendementA)}</td>
        </tr>
        <tr>
          <td>{bmk2}</td>
          <td>{value2}</td>
          <td>{best2}</td>
          <td>{(calculator.mMiseB * 10).toFixed(2)}%</td>
          <td>$ {Math.floor(calculator.mGainB).toFixed(0)}. pts</td>
          <td>$ {Math.floor(calculator.mBeneficeB).toFixed(0)}. pts</td>
          <td>{displayRedeem(calculator.mRendementB)}</td>
        </tr>
      </>
    );
  };

  const modalTitle =
    type === CONVERTER_TYPE.DRAW_NO_BET ? 'Paris composés couverture 2 signes' : 'Paris composés Double Chance';
  const modalSubtitle =
    type === CONVERTER_TYPE.DRAW_NO_BET
      ? 'Un signe Gagnant,  Un signe remboursement total de la mise'
      : 'Deux signes Gagnants';

  const component = ({ date }) => (
    <Modal show={show} onHide={() => setShow(false)} className={styles.converter_modal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className={styles.modal_subtitle}>{modalSubtitle}</h5>
        <Row className='my-4 align-items-center'>
          <Col>
            {match.team1} - {match.team2}
          </Col>
          <Col className='text-center'>
            <Row>
              <Col>1</Col>
              <Col>X</Col>
              <Col>2</Col>
            </Row>
            <hr />
            <Row>
              <Col>{get(match, 'data.forAll.best1')}</Col>
              <Col>{get(match, 'data.forAll.bestX')}</Col>
              <Col>{get(match, 'data.forAll.best2')}</Col>
            </Row>
          </Col>
          <Col className='text-right'>
            {formatDate(date)} {match.hour}
          </Col>
        </Row>

        <h5 className={classNames(styles.modal_subtitle, styles.table_title)}>
          Nouvelle Cote optimisée avec la meilleure cote 1X2
        </h5>
        <Table responsive>
          {show && (
            <tbody className={styles.table_body}>
              {type === CONVERTER_TYPE.DRAW_NO_BET ? (
                <>
                  {renderTableSection('1', 'X')}
                  {renderTableSection('2', 'X')}
                  {renderTableSection('X', '1')}
                  {renderTableSection('2', '1')}
                  {renderTableSection('X', '2')}
                  {renderTableSection('1', '2')}
                </>
              ) : (
                <>
                  {renderTableSection('1', 'X')}
                  {renderTableSection('2', 'X')}
                  {renderTableSection('1', '2')}
                </>
              )}
            </tbody>
          )}
        </Table>

        <p>
          Cote estimée : Elle est issue d’un comparatif de plus de 80 bookmakers dans le monde à l’intention de parieurs
          de France. Elle indique le juste prix au moment de la publication après déduction des taxes. Lorsque le prix
          du bookmaker France est très inférieur à cette estimation
        </p>
        <p>
          Pour réaliser votre répartition vous devez saisir les cotes 1X2 de votre bookmaker dans le répartiteur en
          annexe. La nouvelle cote résultera obligatoirement des cotes 1X2 de votre bookmaker. Pour composer votre pari
          veuillez utiliser le répartiteur :&nbsp;
          {type === CONVERTER_TYPE.DRAW_NO_BET ? (
            <Link to={buildCalculatorPath(0)}>100% Gagnant ou Remboursé</Link>
          ) : (
            <Link to={buildCalculatorPath(1)}>Double Chance</Link>
          )}
        </p>

        <p>* Pts = €, £, $ ... ou toute autre devise.</p>
      </Modal.Body>
    </Modal>
  );

  return {
    component,
    openModal,
  };
};
