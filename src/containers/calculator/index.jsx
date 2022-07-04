import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './index.module.scss';

import Tempalate0 from 'components/calculator/template-0';
import Tempalate1 from 'components/calculator/template-1';
import Tempalate2 from 'components/calculator/template-2';
import Tempalate3 from 'components/calculator/template-3';
import Tempalate4 from 'components/calculator/template-4';

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
    Tempalate2,
    Tempalate2,
  ];
  const TemplateComponent = templates[type];

  return (
    <div className={styles.container}>
      <TemplateComponent />
    </div>
  );
};

export default Calculator;
