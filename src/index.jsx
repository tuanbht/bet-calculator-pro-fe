import React from 'react';
import ReactDOM from 'react-dom';

import Application from './application';

import 'react-datepicker/dist/react-datepicker.css';
import 'styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById('root'),
);
