import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Col, Row, Form, Button, Alert } from 'react-bootstrap';

import styles from './index.module.scss';

import authActions from 'actions/auth-actions';
import { ROOT_PATH } from 'constants/route-paths';
import { ActionFailureType, SIGN_IN } from 'constants/redux-actions';
import { useIsAuthenticated } from 'hooks';

const SignInPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { state = {} } = useLocation();

  const isAuthenticated = useIsAuthenticated();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [signInMessage, setSignInMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      history.replace(state.from ?? ROOT_PATH);
    }
  }, [isAuthenticated, history, state.from]);

  const handleSignIn = () => {
    dispatch(authActions.signIn({ username, password, rememberMe })).then((responseAction) => {
      if (responseAction.type === ActionFailureType(SIGN_IN)) {
        const message = get(responseAction, 'error.response.data.message', '');
        setSignInMessage(message);
      }
    });
  };

  const handleusernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!isEmpty(username) & !isEmpty(password)) {
      handleSignIn();
    }
  };

  return (
    <div className={styles.sign_in_page}>
      <div className={classnames('container', styles.container)}>
        <Row className='align-items-center justify-content-center'>
          <Col md={7} lg={6} className={styles.sign_in_form}>
            <h3 className={styles.title}> Sign In</h3>
            <Form className={classnames('multi-groups-form', styles.form_container)} onSubmit={handleSubmitForm}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder='Username' required value={username} onChange={handleusernameChange} />
              </Form.Group>

              <Form.Group className='mt-4 mb-4'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  autoComplete='off'
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Form.Check className={classnames('d-flex align-items-center', styles.checkbox_group)}>
                  <Form.Check.Input
                    className={styles.remember_checkbox}
                    type='checkbox'
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <Form.Check.Label className={styles.remember_label}>Remember me</Form.Check.Label>
                </Form.Check>
                {!isEmpty(signInMessage) && (
                  <Alert key='danger' variant='danger' className={styles.sign_in_msg}>
                    {signInMessage}
                  </Alert>
                )}
              </Form.Group>

              <Button type='submit' className={styles.sign_in_btn} label='Sign In'>
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignInPage;
