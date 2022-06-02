import React, { useState } from 'react';
import { Button, Col, Form, NavLink, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import map from 'lodash/map';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatMonth } from 'utils/datetime';
import { API_GET_REPORTS } from 'constants/api-paths';

const Report = () => {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(new Date());
  const [locationType, setLocationType] = useState(1);
  const [matches, setMatches] = useState([]);
  const [pronos, setPronos] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApiGetReports = () => {
    setLoading(true);
    AxiosClient.get(API_GET_REPORTS, {
      params: {
        locationType,
        month: formatMonth(month),
      },
      data: null,
    })
      .then((response) => {
        setMatches(response.data.matches);
        setPronos(response.data.pronos);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setMatches([]);
          setPronos([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className='mb-3'>
        <Row>
          <Col className={styles.nav_link_wrapper}>
            <NavLink href='https://editions-ieps.com/contactez-nous/' className={styles.nav_link}>
              En savior plus
            </NavLink>
          </Col>
          <Col className={styles.nav_link_wrapper}>
            <NavLink href='https://ieps.zendesk.com/hc/fr/requests/new' className={styles.nav_link}>
              {"Plus d'informations"}
            </NavLink>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className='my-3'>
            <h3 className={classnames(styles.report_title, 'd-inline')}>Rappot Mensuel</h3>
            <div className='d-inline-block'>
              <Form.Check
                inline
                label='FRANCE'
                name='location-type'
                type='radio'
                id='location-type-french'
                checked={locationType === 1}
                onChange={() => setLocationType(1)}
              />
              <Form.Check
                inline
                label='INTERNATIONAL'
                name='location-type'
                type='radio'
                id='location-type-international'
                checked={locationType === 0}
                onChange={() => setLocationType(0)}
              />
            </div>
          </Col>
          <Col>
            <DatePicker
              className={classnames('form-control', styles.date_picker)}
              placeholderText='Report for month'
              selected={month}
              dateFormat='MM/yyyy'
              showMonthYearPicker
              onChange={setMonth}
            />
          </Col>
          <Col>
            <Button onClick={callApiGetReports}>Load</Button>
          </Col>
        </Row>
      </div>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <Row>
          <Col>
            <h2>{"L'activité en bref"}</h2>
            {map(matches, (value, key) => (
              <h3>
                {value} matches {key}
              </h3>
            ))}
          </Col>

          <Col>
            <h2>Index Prévisions</h2>
            {map(pronos, (value, key) => {
              let convertKey = '';

              switch (key) {
                case 'noType':
                  convertKey = 'Surebets';
                  break;
                case 'drawNoBet':
                  convertKey = 'Avec retour sur mise si résultat X';
                  break;
                case 'doubleChance':
                  convertKey = 'Double Chance';
                  break;
                default: break;
              }

              return (
                <h3>
                  {value} {convertKey}
                </h3>
              );
            })}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Report;
