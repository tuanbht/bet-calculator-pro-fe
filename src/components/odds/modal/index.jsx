import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { get, isEmpty, map, pick } from 'lodash';

import styles from './index.module.scss';

import { formatDate } from 'utils/datetime';
import { HANDICAP, ODD_MODAL_TABS } from 'constants/odd-modal';

export const useOddModal = () => {
  const [show, setShow] = useState();
  const [data, setData] = useState({});
  const [tab, setTab] = useState({});

  const openModal = (data, tab) => {
    setShow(true);
    setData(data);
    setTab(tab);
  };

  const mappingBest = () => {
    const best = pick(get(data, 'data.forAll'), ['best1', 'bestX', 'best2', 'bmk1', 'bmkX', 'bmk2']);

    if (isEmpty(best)) {
      return {};
    } else {
      let response = {};
      response[best.bmk1] = { best1: best.best1 };
      response[best.bmkX] = { ...response[best.bmkX], bestX: best.bestX };
      response[best.bmk2] = { ...response[best.bmk2], best2: best.best2 };
      return response;
    }
  };

  const mappingDrawNoBet = () => {
    const dnb = pick(get(data, 'data.forAll'), ['dnb1', 'dnb2', 'dnBbmk1', 'dnBbmk2']);

    if (isEmpty(dnb)) {
      return {};
    } else {
      let response = {};
      response[dnb.dnBbmk1] = { dnb1: dnb.dnb1 };
      response[dnb.dnBbmk2] = { ...response[dnb.dnBbmk2], dnb2: dnb.dnb2 };
      return response;
    }
  };

  const mappingDoubleChance = () => {
    const dc = pick(get(data, 'data.forAll'), ['dc1X', 'dcx2', 'dc1Xbmk', 'dcx2bmk']);

    if (isEmpty(dc)) {
      return {};
    } else {
      let response = {};
      response[dc.dc1Xbmk] = { dc1X: dc.dc1X };
      response[dc.dcx2bmk] = { ...response[dc.dcx2bmk], dcx2: dc.dcx2 };
      return response;
    }
  };

  const mappingHandicap = (ha) => {
    if (isEmpty(ha)) {
      return {};
    } else {
      let response = {};
      const bet = HANDICAP[ha.bet] || ha.bet;

      response[ha.bmk1] = { bet, odds1: ha.odds1 };
      response[ha.bmk2] = { ...response[ha.bmk2], bet, odds2: ha.odds2 };
      return response;
    }
  };

  const mappingOverunder = (overunder) => {
    if (isEmpty(overunder)) {
      return {};
    } else {
      let response = {};
      response[overunder.bmkO] = { bet: overunder.bet, oddsO: overunder.oddsO };
      response[overunder.bmkU] = { ...response[overunder.bmkU], bet: overunder.bet, oddsU: overunder.oddsU };
      return response;
    }
  };

  const component = ({ date, locationType }) => (
    <Modal show={show} onHide={() => setShow(false)} className={styles.odd_modal}>
      <Modal.Header closeButton />
      <Modal.Body>
        <Row className='mb-4'>
          <Col>
            {data.team1} - {data.team2}
          </Col>
          <Col className='text-right'>
            {formatDate(date)} {data.hour}
          </Col>
        </Row>

        <Tabs defaultActiveKey={tab.eventKey} className='mb-3'>
          <Tab {...ODD_MODAL_TABS.BEST}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Bookmakers</th>
                  <th>1</th>
                  <th>X</th>
                  <th>2</th>
                </tr>
              </thead>
              <tbody>
                {map(
                  mappingBest(),
                  (value, key) =>
                    !isEmpty(key) && (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value.best1}</td>
                        <td>{value.bestX}</td>
                        <td>{value.best2}</td>
                      </tr>
                    ),
                )}
              </tbody>
            </Table>
          </Tab>

          {locationType === 0 && (
            <Tab {...ODD_MODAL_TABS.DRAW_NO_BET}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Bookmakers</th>
                    <th>1</th>
                    <th>2</th>
                  </tr>
                </thead>
                <tbody>
                  {map(
                    mappingDrawNoBet(),
                    (value, key) =>
                      !isEmpty(key) && (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value.dnb1}</td>
                          <td>{value.dnb2}</td>
                        </tr>
                      ),
                  )}
                </tbody>
              </Table>
            </Tab>
          )}

          {locationType === 0 && (
            <Tab {...ODD_MODAL_TABS.DOUBLE_CHANCE}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Bookmakers</th>
                    <th>1X</th>
                    <th>X2</th>
                  </tr>
                </thead>
                <tbody>
                  {map(
                    mappingDoubleChance(),
                    (value, key) =>
                      !isEmpty(key) && (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value.dc1X}</td>
                          <td>{value.dcx2}</td>
                        </tr>
                      ),
                  )}
                </tbody>
              </Table>
            </Tab>
          )}

          {locationType === 0 && (
            <Tab {...ODD_MODAL_TABS.HANDICAP_ASIAN}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Bookmakers</th>
                    <th>Handicap</th>
                    <th>1</th>
                    <th>2</th>
                  </tr>
                </thead>
                <tbody>
                  {get(data, 'data.ha', []).map((ha) =>
                    map(
                      mappingHandicap(ha),
                      (value, key) =>
                        !isEmpty(key) && (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value.bet}</td>
                            <td>{value.odds1}</td>
                            <td>{value.odds2}</td>
                          </tr>
                        ),
                    ),
                  )}
                </tbody>
              </Table>
            </Tab>
          )}

          <Tab {...ODD_MODAL_TABS.OVER_UNDER}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Bookmakers</th>
                  <th>Total</th>
                  <th>Over</th>
                  <th>Under</th>
                </tr>
              </thead>
              <tbody>
                {get(data, 'data.overunder', []).map((overunder) =>
                  map(
                    mappingOverunder(overunder),
                    (value, key) =>
                      !isEmpty(key) && (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value.bet}</td>
                          <td>{value.oddsO}</td>
                          <td>{value.oddsU}</td>
                        </tr>
                      ),
                  ),
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );

  return {
    component,
    openModal,
  };
};
