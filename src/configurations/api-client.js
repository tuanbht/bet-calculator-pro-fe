import Axios from 'axios';

import { API_URL } from 'constants/api-paths';

const AxiosClient = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Key-Inflection': 'camel',
  },
});

export default AxiosClient;
