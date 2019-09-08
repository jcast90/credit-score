import reports from '../api';
import _ from 'lodash';

export const fetchScores = () => async (dispatch, getState) => {
    await dispatch(fetchReports());

    const reports = getState().reports[0];
    const resp = reports.map( report => {
        const { bureau, score } = report.score_details[0];
        return { bureau, score}
    })

    dispatch({ type: 'FETCH_SCORES', payload: resp });
}

export const fetchReports = () => async dispatch => _fetchReports(dispatch)

const _fetchReports = _.memoize( async dispatch => {
    const response = await reports();
    dispatch({ type: 'FETCH_REPORT', payload: response})
})
