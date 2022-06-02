import React, { useState } from 'react';
import { Button, Col, Form, NavLink, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatMonth } from 'utils/datetime';
import { API_GET_MATCH_SCORES, API_GET_PRONOSTICS, API_GET_REPORTS } from 'constants/api-paths';
import MatchScoresTable from 'components/match-scores-table';
import PronosticsTable from 'components/pronostics-table';

const Report = () => {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(new Date());
  const [locationType, setLocationType] = useState(1);
  const [matches, setMatches] = useState([]);
  const [pronos, setPronos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState({});
  const [tableData, setTableData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tableLoading, setTableLoading] = useState(false);
  const [renewPagination, setRenewPagination] = useState(false);

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

  const callApiGetMatchReports = (selectedSport, page) => {
    setTableLoading(true);
    AxiosClient.get(API_GET_MATCH_SCORES, {
      params: {
        sportId: (selectedSport || reportType.value).id,
        page,
        locationType,
        month: formatMonth(month),
      },
      data: null,
    })
      .then((response) => {
        setTableData(response.data.matches);
        setTotalElements(get(response.data, 'pagination.totalElements', 0));
        setTotalPages(get(response.data, 'pagination.totalPages', 0));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setTableData([]);
          setTotalPages(0);
          setTotalElements(0);
        }
      })
      .finally(() => {
        setRenewPagination(false);
        setTableLoading(false);
      });
  };

  const callApiGetPronosticReports = (selectedPronoType, page) => {
    setTableLoading(true);
    AxiosClient.get(API_GET_PRONOSTICS, {
      params: {
        type: selectedPronoType || reportType.value,
        locationType,
        month: formatMonth(month),
        page,
      },
      data: null,
    })
      .then((response) => {
        setTotalElements(get(response.data, 'pagination.totalElements', 0));
        setTotalPages(get(response.data, 'pagination.totalPages', 0));
        setTableData(response.data.pronostics);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(authActions.signOut());
        } else {
          setTotalElements(0);
          setTotalPages(0);
          setTableData([]);
        }
      })
      .finally(() => {
        setRenewPagination(false);
        setTableLoading(false);
      });
  };

  const handleMatchReport = (sport) => {
    setRenewPagination(true);
    setReportType({ value: sport, type: 'sport' });
    callApiGetMatchReports(sport);
  };

  const handlePronoReport = (pronoType) => {
    setRenewPagination(true);
    setReportType({ value: pronoType, type: 'prono' });
    callApiGetPronosticReports(pronoType);
  };

  const matchScoresTableProps = {
    sport: reportType.value,
    totalMatches: totalElements,
    totalPages,
    loading: tableLoading,
    matches: tableData,
    handlePageClick: ({ selected }) => callApiGetMatchReports(null, selected),
    forReport: true,
    renewPagination,
  };

  const pronosticsTableProps = {
    type: reportType.value,
    totalPronostics: totalElements,
    totalPages,
    loading: tableLoading,
    pronostics: tableData,
    handlePageClick: ({ selected }) => callApiGetPronosticReports(null, selected),
    forReport: true,
    renewPagination,
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
            <Button onClick={callApiGetReports} disabled={loading}>
              Load
            </Button>
          </Col>
        </Row>
      </div>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : (
        <div>
          <Row className='mb-3'>
            <Col>
              <h2>{"L'activité en bref"}</h2>
              {matches.map((report, index) => (
                <NavLink key={index} onClick={() => handleMatchReport(report.sport)}>
                  {report.totalMatches} matches {report.sport.name}
                </NavLink>
              ))}
            </Col>

            <Col>
              <h2>Index Prévisions</h2>
              {pronos.map((prono, index) => {
                let convertKey = '';

                switch (prono.type) {
                  case 'NoType':
                    convertKey = 'Surebets';
                    break;
                  case 'DrawNoBet':
                    convertKey = 'Avec retour sur mise si résultat X';
                    break;
                  case 'DoubleChance':
                    convertKey = 'Double Chance';
                    break;
                  default:
                    break;
                }

                return (
                  <NavLink key={index} onClick={() => handlePronoReport(prono.id)}>
                    {prono.totalPronos} {convertKey}
                  </NavLink>
                );
              })}
            </Col>
          </Row>

          {reportType.type === 'sport' && <MatchScoresTable {...matchScoresTableProps} />}
          {reportType.type === 'prono' && <PronosticsTable {...pronosticsTableProps} />}
        </div>
      )}
    </div>
  );
};

export default Report;
