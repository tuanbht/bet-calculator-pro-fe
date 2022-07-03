import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import startsWith from 'lodash/startsWith';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

import { TAGS } from 'constants/pronostics';
import { formatDate, formatDateMonth } from 'utils/datetime';

const PronosticsTable = ({
  totalPronostics,
  loading,
  type,
  pronostics,
  totalPages,
  handlePageClick,
  date,
  renewPagination,
  forReport,
}) => {
  const [match, setMatch] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [pronoType, setPronoType] = useState();

  useEffect(() => {
    if (loading) {
      setPronoType(type);
    }
  }, [loading, type]);

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
    <div className='mt-4'>
      {totalPronostics > 0 && <b>Total Pronostics: {totalPronostics}</b>}
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <Table responsive className={styles.table_matches}>
          <thead>
            <tr>
              {forReport && (
                <>
                  <th>Sport</th>
                  <th>Jour</th>
                </>
              )}
              <th>Heure</th>
              {/* FIXME translate to fr */}
              <th>Country</th>
              <th>Ligue</th>
              <th>Match</th>
              <th>Cote</th>
              <th>{pronoType === 2 ? 'Index' : 'Pronostic'}</th>
              {pronoType !== 2 && <th>Bookmaker</th>}
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {pronostics.map((match, matchIdx) => (
              <tr key={matchIdx}>
                {forReport && (
                  <>
                    <td>{match.sportName}</td>
                    <td>{formatDateMonth(match.date)}</td>
                  </>
                )}
                <td>{match.hour}</td>
                <td>{match.country}</td>
                <td>{match.league}</td>
                <td>
                  {match.team1} - {match.team2}
                </td>
                <td>{match.odd}</td>
                <td>{match.prono}</td>
                {pronoType !== 2 && (
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
      {renewPagination && (
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
              {formatDate(date || match.date)} {match.hour}
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

PronosticsTable.propTypes = {
  totalPronostics: PropTypes.number,
  type: PropTypes.number,
  loading: PropTypes.bool,
  scoreCols: PropTypes.array,
  pronostics: PropTypes.array,
  totalPages: PropTypes.number,
  handlePageClick: PropTypes.func,
  date: PropTypes.any,
  renewPagination: PropTypes.bool,
  forReport: PropTypes.bool,
};

export default PronosticsTable;
