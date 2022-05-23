import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';
import ReactPaginate from 'react-paginate';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatDate } from 'utils/datetime';

const Pronostics = () => {
  const dispatch = useDispatch();
  const sports = useSelector((state) => state.sports);

  const [sportId, setSportId] = useState();
  const [date, setDate] = useState(new Date());
  const [locationType, setLocationType] = useState(0);
  const [type, setType] = useState(0);
  const [totalPronostics, setTotalPronostics] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pronostics, setPronostics] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApiGetPronostics = (page = 0) => {
    setLoading(true);
    AxiosClient.get('/pronostics', {
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

  const handleChangeType = (event) => setType(event.target.value);

  return (
    <div>
      <div>
        <Row>
          <Col>
            <h3 className={classnames(styles.pronostics_index, 'd-inline')}>Pronostics Index</h3>
            <Form.Check
              inline
              label='International'
              name='location-type'
              type='radio'
              id='location-type-international'
              checked={locationType === 0}
              onChange={() => setLocationType(0)}
            />
            <Form.Check
              inline
              label='French'
              name='location-type'
              type='radio'
              id='location-type-french'
              checked={locationType === 1}
              onChange={() => setLocationType(1)}
            />
          </Col>
          <Col xs='auto' className={styles.select_type}>
            <Form.Select value={type} onChange={handleChangeType}>
              <option value={0}>Gagnant ou Retour sur Mise</option>
              <option value={1}>Double Chance</option>
              <option value={2}>Index</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            {sports.map((sport) => (
              <Col
                key={sport.id}
                as={Button}
                onClick={() => setSportId(sport.id)}
                className={classnames(styles.sport_button, sportId === sport.id && styles.active)}
              >
                {sport.name}
              </Col>
            ))}

            <DatePicker
              className={classnames('mb-2 form-control', styles.date_picker)}
              placeholderText='Date'
              selected={date}
              showYearDropdown
              onChange={setDate}
            />
          </Col>
          <Col>
            <Button onClick={handleClickSubmit}>Aide</Button>
          </Col>
        </Row>
      </div>
      {totalPronostics > 0 && <b>Total Pronostics: {totalPronostics}</b>}
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>Heure</th>
              {/* FIXME translate to fr */}
              <th>Country</th>
              <th>Ligue</th>
              <th>Equipe 1</th>
              <th>Equipe 2</th>
              <th>Cote</th>
              <th>Pronostic</th>
              <th>Bookmaker</th>
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {pronostics.map((match, matchIdx) => (
              <tr key={matchIdx}>
                <td>{match.hour}</td>
                <td>{match.country}</td>
                <td>{match.league}</td>
                <td>{match.team1}</td>
                <td>{match.team2}</td>
                <td>{match.odd}</td>
                <td>{match.prono}</td>
                <td>{match.bookmaker}</td>
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
    </div>
  );
};

export default Pronostics;
