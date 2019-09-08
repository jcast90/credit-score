import { combineReducers } from 'redux';
import fetchReports from './fetchReports';
import fetchScores from './fetchScores';

export default combineReducers({
    reports: fetchReports,
    scores: fetchScores
});