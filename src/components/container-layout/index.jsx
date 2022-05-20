import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './index.module.scss';

import Header from 'components/header';

const ContainerLayout = ({ container: Container }) => (
  <div className={classnames(styles.layout, 'container')}>
    <Header />
    <Container />
  </div>
);

ContainerLayout.propTypes = {
  container: PropTypes.elementType,
};

export default ContainerLayout;
