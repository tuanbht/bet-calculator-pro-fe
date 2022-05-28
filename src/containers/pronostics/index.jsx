import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import startsWith from 'lodash/startsWith';
import ReactPaginate from 'react-paginate';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatDate } from 'utils/datetime';
import { API_GET_PRONOSTICS } from 'constants/api-paths';

const TAGS = ['Gagnant ou Retour sur Mise', 'Double Chance', 'Index'];

const Pronostics = () => {
  const dispatch = useDispatch();
  const sports = useSelector((state) => state.sports);

  const [sportId, setSportId] = useState(1);
  const [date, setDate] = useState(new Date());
  const [locationType, setLocationType] = useState(1);
  const [type, setType] = useState(0);
  const [totalPronostics, setTotalPronostics] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pronostics, setPronostics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const callApiGetPronostics = (page = 0) => {
    setLoading(true);
    AxiosClient.get(API_GET_PRONOSTICS, {
      params: {
        sportId,
        type,
        locationType,
        date: formatDate(date),
        page,
      },
      data: null,
    })
      .then((response) => {
        setTotalPronostics(get(response.data, 'pagination.totalElements', 0));
        setTotalPages(get(response.data, 'pagination.totalPages', 0));
        setPronostics(response.data.pronostics);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setTotalPronostics(0);
          setTotalPages(0);
          setPronostics([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickSubmit = () => {
    callApiGetPronostics();
    setTotalPronostics(0);
  };

  const handlePageClick = ({ selected }) => {
    callApiGetPronostics(selected);
  };

  const handleChangeType = (event) => setType(parseInt(event.target.value));

  const handleCloseDetailsModal = () => {
    setShowDetails(false);
    setMatch({});
  };

  const handleShowDetailsModal = (match) => {
    setShowDetails(true);
    setMatch(match);
  };

  const getTitleModal = (match) => (match.winner === 'home' && 'Dom.') || (match.winner === 'away' && 'Ext.');

  const getPronoResult = (match) => (match.winner === 'home' && 1) || (match.winner === 'away' && 2);

  const showOdd = (odd) => (!isEmpty(odd) && !startsWith('0') ? odd : '');

  return (
    <div>
      <div>
        <Row>
          <Col>
            <h3 className={classnames(styles.pronostics_index, 'd-inline')}>Pronostics Index</h3>
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
          <Col xs='auto' className={styles.select_type}>
            <Form.Select value={type} onChange={handleChangeType}>
              {TAGS.map((tag, idx) => (
                <option key={idx} value={idx}>
                  {tag}
                </option>
              ))}
            </Form.Select>
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

            <DatePicker
              className={classnames('mt-2 form-control', styles.date_picker)}
              placeholderText='Date'
              selected={date}
              showYearDropdown
              onChange={setDate}
            />
          </Col>
          <Col>
            <Button onClick={handleClickSubmit}>Load</Button>
          </Col>
        </Row>
      </div>
      {totalPronostics > 0 && <b>Total Pronostics: {totalPronostics}</b>}
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <Table responsive className={styles.table_matches}>
          <thead>
            <tr>
              <th>Heure</th>
              {/* FIXME translate to fr */}
              <th>Country</th>
              <th>Ligue</th>
              <th>Match</th>
              <th>Cote</th>
              <th>{type === 2 ? 'Index' : 'Pronostic'}</th>
              {type !== 2 && <th>Bookmaker</th>}
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {pronostics.map((match, matchIdx) => (
              <tr key={matchIdx}>
                <td>{match.hour}</td>
                <td>{match.country}</td>
                <td>{match.league}</td>
                <td>
                  {match.team1} - {match.team2}
                </td>
                <td>{match.odd}</td>
                <td>{match.prono}</td>
                {type !== 2 && (
                  <td
                    role='gridcell'
                    className={classnames(match.details && styles.active)}
                    onClick={() => handleShowDetailsModal(match)}
                  >
                    {match.bookmaker}
                  </td>
                )}
                <td>{match.category}</td>
              </tr>
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

      <Modal show={showDetails} onHide={handleCloseDetailsModal} className={styles.details_modal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {TAGS[type]} {getTitleModal(match)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='mb-4'>
            <Col>
              {match.team1} - {match.team2}
            </Col>
            <Col className='text-right'>
              {formatDate(date)} {match.hour}
            </Col>
          </Row>

          <Table responsive>
            <thead>
              <tr>
                <th>Bookmakers</th>
                <th>Signes à jouer</th>
                <th>Cote</th>
                <th>Taux de distribution mise</th>
                <th>Nouvelle Cote</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{get(match, 'details.bmk2')}</td>
                <td>{getPronoResult(match)}</td>
                <td>{showOdd(get(match, 'details.odd2'))}</td>
                <td>{get(match, 'details.percent1')}</td>
                <td rowSpan='2'>
                  <div className={styles.modal_odd}>{showOdd(match.odd)}</div>
                </td>
              </tr>
              <tr>
                <td>{get(match, 'details.bmk3')}</td>
                <td>X</td>
                <td>{showOdd(get(match, 'details.odd3'))}</td>
                <td>{get(match, 'details.percent2')}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Pronostics;
