import moment from 'moment';

export const formatDate = (date) => moment(date).format('YYYY-MM-DD');
export const formatDateMonth = (date) => moment(date).format('MMM DD');
export const formatMonth = (date) => moment(date).format('YYYY-MM-01');
