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

export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE'
export const setActivePage = page => ({
  type: SET_ACTIVE_PAGE,
  payload: page,
})

export const SET_ACCOUNTS_SHOWN_PER_PAGE = 'SET_ACCOUNTS_SHOWN_PER_PAGE'
export const setAccountsShownPerPage = count => ({
  type: SET_ACCOUNTS_SHOWN_PER_PAGE,
  payload: count,
})

export const SET_FILTER_BY_BUREAU = 'SET_FILTER_BY_BUREAU'
export const setActiveBureau = bureau => ({
  type: SET_FILTER_BY_BUREAU,
  payload: bureau,
})
