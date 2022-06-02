import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatDate } from 'utils/datetime';
import { API_GET_MATCH_SCORES } from 'constants/api-paths';
import MatchScoresTable from 'components/match-scores-table';

const MatchesAndScores = () => {
  const dispatch = useDispatch();
  const sports = useSelector((state) => state.sports);

  const [sport, setSport] = useState({});
  const [date, setDate] = useState(new Date());
  const [totalMatches, setTotalMatches] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renewPagination, setRenewPagination] = useState(false);

  const callApiGetMatches = (page = 0) => {
    setLoading(true);
    AxiosClient.get(API_GET_MATCH_SCORES, {
      params: {
        sportId: sport.id,
        date: formatDate(date),
        page,
      },
      data: null,
    })
      .then((response) => {
        setTotalMatches(get(response.data, 'pagination.totalElements', 0));
        setTotalPages(get(response.data, 'pagination.totalPages', 0));
        setMatches(response.data.matches);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setTotalMatches(0);
          setTotalPages(0);
          setMatches([]);
        }
      })
      .finally(() => {
        setLoading(false);
        setRenewPagination(false);
      });
  };

  const handleClickSubmit = () => {
    setRenewPagination(true);
    setTotalMatches(0);
    callApiGetMatches();
  };

  const handlePageClick = ({ selected }) => {
    callApiGetMatches(selected);
  };

  const matchScoresTableProps = {
    sport,
    totalMatches,
    totalPages,
    loading,
    matches,
    handlePageClick,
    renewPagination,
  };

  return (
    <div>
      <Row>
        <Col>
          <Row>
            {sports.map((persistedSport) => (
              <Col key={persistedSport.id}>
                <Button
                  onClick={() => setSport(persistedSport)}
                  className={classnames(styles.sport_button, persistedSport === sport && styles.active)}
                >
                  {persistedSport.name}
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
          <Button onClick={handleClickSubmit} disabled={loading}>
            Load
          </Button>
        </Col>
      </Row>
      <MatchScoresTable {...matchScoresTableProps} />
    </div>
  );
};

export default MatchesAndScores;
