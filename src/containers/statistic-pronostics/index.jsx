import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatDate } from 'utils/datetime';
import { API_GET_STATISTIC_PRONOSTICS } from 'constants/api-paths';

const CATEGORY_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

const PronosticStatistics = () => {
  const dispatch = useDispatch();
  const sports = useSelector((state) => state.sports);

  const [sportId, setSportId] = useState(1);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [locationType, setLocationType] = useState(1);
  const [type, setType] = useState(1);
  const [total, setTotal] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApiGetPronostics = () => {
    setLoading(true);
    AxiosClient.get(API_GET_STATISTIC_PRONOSTICS, {
      params: {
        sportId,
        type,
        locationType,
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate),
      },
      data: null,
    })
      .then((response) => {
        setCategories(response.data.categories);
        setTotal(response.data.total);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setCategories([]);
          setTotal();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickSubmit = () => {
    callApiGetPronostics();
  };

  const renderTableTotal = () => {
    const totalPronos = total.w + total.d + total.l;
    const globalPercent = totalPronos === 0 ? 0 : Number((((total.w + total.d) * 100.0) / totalPronos).toFixed(2));
    const wPercent = totalPronos === 0 ? 0 : Number(((total.w * 100.0) / totalPronos).toFixed(2));
    const dPercent = totalPronos === 0 ? 0 : Number(((total.d * 100.0) / totalPronos).toFixed(2));
    const lPercent = totalPronos === 0 ? 0 : Number(((total.l * 100.0) / totalPronos).toFixed(2));

    return (
      <div className={styles.table}>
        <h3 className={styles.title}>
          <div>Toutes catégories</div>
          <div>
            Gagnant Hors Remboursés - {total.w} - {wPercent} %
          </div>
        </h3>
        <Table responsive>
          <thead>
            <tr>
              <th className='text-center'>Nb Pronostics</th>
              <th className='text-center'>Gagnant</th>
              <th className='text-center'>Remboursés</th>
              <th className='text-center'>Perdant</th>
              <th className='text-center'>Global*</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan='2'>
                <div className={styles.row_span_2}>{totalPronos}</div>
              </td>
              <td className='text-center'>{total.w}</td>
              <td className='text-center'>{total.d}</td>
              <td className='text-center'>{total.l}</td>
              <td rowSpan='2'>
                <div className={styles.row_span_2}>{globalPercent} %</div>
              </td>
            </tr>
            <tr>
              <td className='text-center'>{wPercent} %</td>
              <td className='text-center'>{dPercent} %</td>
              <td className='text-center'>{lPercent} %</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      <div>
        <Row>
          <Col md='12' lg className='my-3'>
            <h3 className={classnames(styles.statistic_title, 'd-inline')}>Statistiques Générales</h3>
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
          <Col xs='auto' className='my-3'>
            <p>Type Pronostic</p>
            <Form.Check
              label='Double Chance'
              name='pronostic-type'
              type='radio'
              id='location-type-dc'
              checked={type === 1}
              onChange={() => setType(1)}
            />
            <Form.Check
              label='Gagnant ou Retour sur Mise'
              name='pronostic-type'
              type='radio'
              id='location-type-dnb'
              checked={type === 2}
              onChange={() => setType(2)}
            />
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <Row>
              {sports.map((sport) => (
                <Col key={sport.id}>
                  <Button
                    onClick={() => setSportId(sport.id)}
                    className={classnames(styles.sport_button, sportId === sport.id && styles.active)}
                  >
                    {sport.name}
                  </Button>
                </Col>
              ))}
            </Row>

            <Row className='mt-4'>
              <h5>Période</h5>
              <Col>
                <span>Du: </span>
                <DatePicker
                  className={classnames('mt-2 form-control', styles.date_picker)}
                  placeholderText='From Date'
                  selected={fromDate}
                  showYearDropdown
                  onChange={setFromDate}
                />
              </Col>
              <Col>
                <span>Au: </span>
                <DatePicker
                  className={classnames('mt-2 form-control', styles.date_picker)}
                  placeholderText='To Date'
                  selected={toDate}
                  showYearDropdown
                  onChange={setToDate}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button onClick={handleClickSubmit}>Load</Button>
          </Col>
        </Row>
      </div>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <div>
          {total && renderTableTotal()}
          <div className={styles.table}>
            <h3>Réussite par catégorie</h3>
            <div className={classnames(styles.cat_type_wrapper, 'my-3')}>
              <div className={styles.cat_type}>
                <div className={classnames(styles.cat_type_color, styles.cat_type_color_1)} />
                <span>: Ligue 1, 2, 3, 4</span>
              </div>
              <div className={styles.cat_type}>
                <div className={classnames(styles.cat_type_color, styles.cat_type_color_2)} />
                <span>: Coupe Internationale</span>
              </div>
              <div className={styles.cat_type}>
                <div className={classnames(styles.cat_type_color, styles.cat_type_color_3)} />
                <span>: Coupe Nationale</span>
              </div>
              <div className={styles.cat_type}>
                <div className={classnames(styles.cat_type_color, styles.cat_type_color_4)} />
                <span>: Amicaux</span>
              </div>
            </div>
            <Table responsive className={styles.table_matches}>
              <thead>
                <tr>
                  <th>Catégories</th>
                  <th className='text-center'>Nb</th>
                  <th className='text-center'>G</th>
                  <th className='text-center'>R</th>
                  <th className='text-center'>P</th>
                  <th className='text-center'>Global*</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, idx) => {
                  const catTotal = category.w + category.d + category.l;
                  const globalPercent = Number((((category.w + category.d) * 100.0) / catTotal).toFixed(2));

                  return (
                    <tr key={idx} className={styles[`cat_type_color_${Math.ceil((idx + 1) / 4)}`]}>
                      <td>Cat. {CATEGORY_NAMES[idx]}</td>
                      <td className='text-center'>{catTotal}</td>
                      <td className='text-center'>{category.w}</td>
                      <td className='text-center'>{category.d}</td>
                      <td className='text-center'>{category.l}</td>
                      <td className='text-center'>{catTotal > 0 && `${globalPercent} %`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      )}
      <p>*(Global = Gagnants + Remboursés)</p>
    </div>
  );
};

export default PronosticStatistics;
