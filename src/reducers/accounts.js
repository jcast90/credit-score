import * as TYPES from '../actions'

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
    case TYPES.FETCH_REPORT_SUCCESS:
      return flattenBureauAccounts(action.payload).map(
        account => account.number,
      )
    case TYPES.FETCH_REPORT_PENDING:
    case TYPES.FETCH_REPORT_ERROR:
    default:
      return state
  }
}

const byId = (state = {}, action = { type: '' }) => {
  switch (action.type) {
    case TYPES.FETCH_REPORT_SUCCESS:
      return flattenBureauAccounts(action.payload).reduce((byId, account) => {
        byId[account.number] = account
        return byId
      }, {})
    case TYPES.FETCH_REPORT_PENDING:
    case TYPES.FETCH_REPORT_ERROR:
    default:
      return state
  }
}

const filters = (
  state = {
    activePage: 0,
    activeBureau: null,
    rowsPerPage: ACCOUNTS_PER_PAGE_OPTIONS[0],
  },
  action = { type: '' },
) => {
  switch (action.type) {
    case TYPES.FETCH_REPORT_SUCCESS:
      return {
        ...state,
        activePage: 0,
      }
    case TYPES.SET_FILTER_BY_BUREAU:
      const { activeBureau: prevBureauFilter } = state
      const selectedFilter = action.payload
      // removes the filter if already included, otherwise add
      return {
        ...state,
        activePage: 0,
        activeBureau:
          prevBureauFilter === selectedFilter ? null : selectedFilter,
      }
    case TYPES.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      }
    case TYPES.SET_ACCOUNTS_SHOWN_PER_PAGE:
      return {
        ...state,
        activePage: 0,
        rowsPerPage: action.payload,
      }
    case TYPES.FETCH_REPORT_PENDING:
    case TYPES.FETCH_REPORT_ERROR:
    default:
      return state
  }
}

export default combineReducers({
  allIds,
  byId,
  filters,
})
