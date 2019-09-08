import { getReportsData } from '../api'
import isApiError from '../lib/isApiError'

export const FETCH_REPORT_PENDING = 'FETCH_REPORT_PENDING'
export const bootstrapApp = () => async dispatch => {
  dispatch({ type: 'FETCH_REPORT_PENDING' })
  await dispatch(fetchReports)
}

export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS'
export const FETCH_REPORT_ERROR = 'FETCH_REPORT_ERROR'
export const fetchReports = async dispatch => {
  const { statusCode, body } = await getReportsData()

  if (isApiError(statusCode)) {
    dispatch({ type: FETCH_REPORT_ERROR })
  } else {
    dispatch({
      type: FETCH_REPORT_SUCCESS,
      payload: body,
    })
  }
}
