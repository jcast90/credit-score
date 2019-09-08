import {
  FETCH_REPORT_ERROR,
  FETCH_REPORT_PENDING,
  FETCH_REPORT_SUCCESS,
  SET_FILTER_BY_BUREAU,
} from '../actions'

import { ACCOUNTS_PER_PAGE_OPTIONS } from '../common/config'
import { combineReducers } from 'redux'
import { concat } from 'lodash'

/**
 * Returns a list of all accounts in each bureau
 */
const flattenBureauAccounts = bureauData => {
  let accounts = []
  if (!(bureauData && bureauData.length)) return accounts

  bureauData.forEach(bureau => {
    const mappedAccounts =
      bureau.accounts &&
      bureau.accounts.map(account => ({ ...account, bureau: bureau.bureau }))

    accounts = concat(accounts, mappedAccounts)
  })
  return accounts
}

const allIds = (state = [], action = { type: '' }) => {
  switch (action.type) {
    case FETCH_REPORT_SUCCESS:
      return flattenBureauAccounts(action.payload).map(
        account => account.number,
      )
    case FETCH_REPORT_PENDING:
    case FETCH_REPORT_ERROR:
    default:
      return state
  }
}

const byId = (state = {}, action = { type: '' }) => {
  switch (action.type) {
    case FETCH_REPORT_SUCCESS:
      return flattenBureauAccounts(action.payload).reduce((byId, account) => {
        byId[account.number] = account
        return byId
      }, {})
    case FETCH_REPORT_PENDING:
    case FETCH_REPORT_ERROR:
    default:
      return state
  }
}

const filters = (
  state = {
    activePage: 0,
    activeBureau: null,
    perPageCount: ACCOUNTS_PER_PAGE_OPTIONS[0],
  },
  action = { type: '' },
) => {
  switch (action.type) {
    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        activePage: 1,
      }
    case SET_FILTER_BY_BUREAU:
      const { activeBureau: prevBureauFilter } = state
      const selectedFilter = action.payload
      // removes the filter if already included, otherwise add
      return {
        ...state,
        activePage: 1,
        activeBureau:
          prevBureauFilter === selectedFilter ? null : selectedFilter,
      }
    case FETCH_REPORT_PENDING:
    case FETCH_REPORT_ERROR:
    default:
      return state
  }
}

export default combineReducers({
  allIds,
  byId,
  filters,
})
