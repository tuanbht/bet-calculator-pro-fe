import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import get from 'lodash/get';

import styles from './index.module.scss';

import AxiosClient from 'configurations/api-client';
import authActions from 'actions/auth-actions';
import { formatDate } from 'utils/datetime';
import { API_GET_PRONOSTICS } from 'constants/api-paths';
import { TAGS } from 'constants/pronostics';
import PronosticsTable from 'components/pronostics-table';

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
  const [renewPagination, setRenewPagination] = useState(false);

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
        setRenewPagination(false);
      });
  };

  const handleClickSubmit = () => {
    setTotalPronostics(0);
    setRenewPagination(true);
    callApiGetPronostics();
  };

  const handlePageClick = ({ selected }) => {
    callApiGetPronostics(selected);
  };

  const handleChangeType = (event) => setType(parseInt(event.target.value));

  const pronosticsTableProps = {
    totalPronostics,
    loading,
    type,
    pronostics,
    totalPages,
    handlePageClick,
    date,
    renewPagination,
  };

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
      <PronosticsTable {...pronosticsTableProps} />
    </div>
  );
};

export default Pronostics;
