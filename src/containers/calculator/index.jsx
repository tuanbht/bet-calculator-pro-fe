import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './index.module.scss';

import {
  Tempalate0,
  Tempalate1,
  Tempalate2,
  Tempalate3,
  Tempalate4,
  Tempalate5,
  Tempalate6,
} from 'components/calculator';

const Calculator = () => {
  const { type } = useParams();

  const templates = [
    Tempalate0,
    Tempalate1,
    Tempalate2,
    Tempalate3,
    Tempalate2,
    Tempalate2,
    Tempalate4,
    Tempalate4,
    Tempalate5,
    Tempalate6,
  ];
  const TemplateComponent = templates[type];

  return (
    <div className={styles.container}>
      <TemplateComponent />
    </div>
  );
};

export default Calculator;
