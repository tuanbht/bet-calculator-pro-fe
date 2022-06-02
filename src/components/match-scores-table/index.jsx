import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import { Spinner, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const MatchScoresTable = ({
  totalMatches,
  loading,
  sport,
  matches,
  totalPages,
  handlePageClick,
  forReport,
  renewPagination,
}) => {
  const [scoreCols, setScoreCols] = useState([]);

  useEffect(() => {
    if (loading) {
      setScoreCols(mappedSoccerCols(sport.name));
    }
  }, [loading, sport]);

  const mappedSoccerCols = (sportName) => {
    switch (sportName) {
      case 'FOOTBALL':
        return ['Sc. MT', 'Sc. Final'];
      case 'HANDBALL':
        return ['Sc. 1', 'Sc. 2', 'Sc. Final'];
      case 'HOCKEY':
        return ['Sc. 1', 'Sc. 2', 'Sc. 3', 'Sc. Final', 'Sc. OT'];
      case 'BASKETBALL':
        return ['Sc. 1', 'Sc. 2', 'Sc. Final', 'Sc. OT'];
      default:
        return [];
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <div>
          {totalMatches > 0 && <b>Total Matches: {totalMatches}</b>}
          <Table responsive className={styles.table_container}>
            <thead>
              <tr>
                {forReport && <th>Jour</th>}
                <th>Heure</th>
                {/* FIXME translate to fr */}
                <th>Country</th>
                <th>Ligue</th>
                <th>Match</th>
                {scoreCols.map((colName, index) => (
                  <th key={index}>{colName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matches.map((match, matchIdx) => (
                <tr key={matchIdx}>
                  {forReport && <td>{match.date}</td>}
                  <td>{match.hour}</td>
                  <td>{match.country}</td>
                  <td>{match.league}</td>
                  <td>
                    {match.team1} - {match.team2}
                  </td>
                  {scoreCols.map((_, index) => (
                    <td key={index}>{get(match.scores, index) || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {renewPagination || (
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
      )}
    </div>
  );
};

MatchScoresTable.propTypes = {
  sport: PropTypes.object,
  totalMatches: PropTypes.number,
  loading: PropTypes.bool,
  scoreCols: PropTypes.array,
  matches: PropTypes.array,
  totalPages: PropTypes.number,
  handlePageClick: PropTypes.func,
  forReport: PropTypes.bool,
  renewPagination: PropTypes.bool,
};

export default MatchScoresTable;
