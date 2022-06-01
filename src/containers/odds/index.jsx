import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';
import find from 'lodash/find';
import ReactPaginate from 'react-paginate';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatDate } from 'utils/datetime';
import { API_GET_ODDS } from 'constants/api-paths';
import { getNumberForDisplaying } from 'utils/number';

const OddsPage = () => {
  const dispatch = useDispatch();
  const sports = useSelector((state) => state.sports);

  const [sportId, setSportId] = useState(1);
  const [date, setDate] = useState(new Date());
  const [locationType, setLocationType] = useState(1);
  const [hourRange, setHourRange] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApiGetPronostics = (page = 0) => {
    setLoading(true);
    AxiosClient.get(API_GET_ODDS, {
      params: {
        sportId,
        hourRange,
        locationType,
        date: formatDate(date),
        page,
      },
      data: null,
    })
      .then((response) => {
        setTotalMatches(get(response.data, 'pagination.totalElements', 0));
        setTotalPages(get(response.data, 'pagination.totalPages', 0));
        setContent(response.data.content);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setTotalMatches(0);
          setTotalPages(0);
          setContent([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickSubmit = () => {
    callApiGetPronostics();
    setTotalMatches(0);
  };

  const handlePageClick = ({ selected }) => {
    callApiGetPronostics(selected);
  };

  const handleChangeHourRange = (event) => setHourRange(parseInt(event.target.value));

  return (
    <div>
      <div>
        <Row>
          <Col>
            <h3 className={classnames(styles.pronostics_index, 'd-inline')}>Cotes du Jour</h3>
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

            <Row className='mt-2'>
              <Col>
                <p>Date</p>
                <DatePicker
                  className={classnames('form-control', styles.date_picker)}
                  placeholderText='Date'
                  selected={date}
                  showYearDropdown
                  onChange={setDate}
                />
              </Col>
              <Col className={styles.select_type}>
                <p>Hour Range</p>
                <Form.Select value={hourRange} onChange={handleChangeHourRange}>
                  <option value={0}>0-6</option>
                  <option value={6}>6-12</option>
                  <option value={12}>12-18</option>
                  <option value={18}>18-24</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button onClick={handleClickSubmit}>Load</Button>
          </Col>
        </Row>
      </div>
      {totalMatches > 0 && <b>Total Matches: {totalMatches}</b>}
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <Table responsive className={styles.table_matches}>
          <thead>
            <tr>
              <th rowSpan='2'>Heure</th>
              <th rowSpan='2'></th>
              <th rowSpan='2' colSpan='3'>
                Cotes moyennes
              </th>
              <th rowSpan='2' colSpan='3'>
                Meilleure cote
              </th>
              <th rowSpan='2' colSpan='2'>
                Buts
              </th>
              {locationType === 0 && (
                <>
                  <th rowSpan='2' colSpan='2'>
                    Handicap Asian
                  </th>
                  <th rowSpan='2' colSpan='2'>
                    Draw No Bet
                  </th>
                  <th rowSpan='2' colSpan='2'>
                    Double Chance
                  </th>
                </>
              )}
              <th colSpan='4'>Paris Composés - Risque Modéré - Couvrez 2 signes</th>
            </tr>
            <tr>
              <th colSpan='2'>Avec retour sur mise si résultat X</th>
              <th colSpan='2'>Double Chance</th>
            </tr>
          </thead>
          <tbody>
            {content.map((group, groupIdx) => (
              <>
                <tr key={groupIdx}>
                  <th></th>
                  <th>{group.key}</th>
                  <th>1</th>
                  <th>x</th>
                  <th>2</th>
                  <th>1</th>
                  <th>x</th>
                  <th>2</th>
                  <th>2.5</th>
                  <th>2.5</th>
                  {locationType === 0 && (
                    <>
                      <th>1</th>
                      <th>2</th>
                      <th>Dom</th>
                      <th>Ext</th>
                      <th>1X</th>
                      <th>X2</th>
                    </>
                  )}
                  <th>Dom</th>
                  <th>Ext</th>
                  <th>1X</th>
                  <th>X2</th>
                </tr>

                {group.value.map((match, matchIdx) => {
                  const overUnder = find(match.data.overunder, (ou) => ou.bet === '2.5');
                  const handicapAsian = find(match.data.ha, (ha) => ha.bet === '-0.5');

                  return (
                    <tr key={matchIdx}>
                      <td>{match.hour}</td>
                      <td>
                        {match.team1} - {match.team2}
                      </td>
                      <td>{get(match.data, 'forAll.ave1')}</td>
                      <td>{get(match.data, 'forAll.aveX')}</td>
                      <td>{get(match.data, 'forAll.ave2')}</td>
                      <td>{get(match.data, 'forAll.best1')}</td>
                      <td>{get(match.data, 'forAll.bestX')}</td>
                      <td>{get(match.data, 'forAll.best2')}</td>
                      <td>{get(overUnder, 'oddsO')}</td>
                      <td>{get(overUnder, 'oddsU')}</td>
                      {locationType === 0 && (
                        <>
                          <td>{get(handicapAsian, 'odds1')}</td>
                          <td>{get(handicapAsian, 'odds2')}</td>
                          <td>{getNumberForDisplaying(get(match.data, 'forAll.dnb1'))}</td>
                          <td>{getNumberForDisplaying(get(match.data, 'forAll.dnb2'))}</td>
                          <td>{get(match.data, 'forAll.dc1X')}</td>
                          <td>{get(match.data, 'forAll.dcx2')}</td>
                        </>
                      )}
                      <td>{getNumberForDisplaying(get(match.data, 'forAll.dnBown1'))}</td>
                      <td>{getNumberForDisplaying(get(match.data, 'forAll.dnBown2'))}</td>
                      <td>{get(match.data, 'forAll.dCown1X')}</td>
                      <td>{get(match.data, 'forAll.dCown2X')}</td>
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </Table>
      )}
      <ReactPaginate
        previousLabel='Previous'
        nextLabel='Next'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName='pagination'
        activeClassName='active'
      />
    </div>
  );
};

export default OddsPage;
