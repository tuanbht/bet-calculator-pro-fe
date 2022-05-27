import React, { useState } from 'react';
import { Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import times from 'lodash/times';
import get from 'lodash/get';
import ReactPaginate from 'react-paginate';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatDate } from 'utils/datetime';
import { API_GET_MATCH_SCORES } from 'constants/api-paths';

const MatchesAndScores = () => {
  const dispatch = useDispatch();
  const sports = useSelector((state) => state.sports);

  const [sportId, setSportId] = useState();
  const [date, setDate] = useState(new Date());
  const [totalMatches, setTotalMatches] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [maxScoreIndex, setMaxScoreIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const callApiGetMatches = (page = 0) => {
    setLoading(true);
    AxiosClient.get(API_GET_MATCH_SCORES, {
      params: {
        sportId,
        date: formatDate(date),
        page,
      },
      data: null,
    })
      .then((response) => {
        setTotalMatches(get(response.data, 'pagination.totalElements', 0));
        setTotalPages(get(response.data, 'pagination.totalPages', 0));
        setMaxScoreIndex(response.data.maxScoreIndex);
        setMatches(response.data.matches);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setTotalMatches(0);
          setTotalPages(0);
          setMaxScoreIndex(0);
          setMatches([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickSubmit = () => {
    callApiGetMatches();
    setTotalMatches(0);
  };

  const handlePageClick = ({ selected }) => {
    callApiGetMatches(selected);
  };

  return (
    <div>
      <Row>
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
      {totalMatches > 0 && <b>Total Matches: {totalMatches}</b>}
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
              <th>Match</th>
              {times(maxScoreIndex, (index) => (
                <th key={index}>Score {index}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matches.map((match, matchIdx) => (
              <tr key={matchIdx}>
                <td>{match.hour}</td>
                <td>{match.country}</td>
                <td>{match.league}</td>
                <td>{match.team1} - {match.team2}</td>
                {times(maxScoreIndex, (index) => (
                  <td key={index}>{get(match.scores, index) || '-'}</td>
                ))}
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

export default MatchesAndScores;
