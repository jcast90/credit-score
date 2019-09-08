import {
  FETCH_REPORT_ERROR,
  FETCH_REPORT_PENDING,
  FETCH_REPORT_SUCCESS,
} from '../actions'
import { get, pick } from 'lodash'

import { combineReducers } from 'redux'

const allIds = (state = [], action = { type: '' }) => {
  switch (action.type) {
    case FETCH_REPORT_SUCCESS:
      return action.payload.map(bureau =>
        get(bureau, 'score_details[0].credit_score_id'),
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
      return action.payload.reduce((bureaus, bureau) => {
        const details = get(bureau, 'score_details[0]')
        if (!details) return bureaus

        bureaus[get(details, 'credit_score_id')] = pick(details, [
          'bureau',
          'model',
          'score',
          'score_rating',
        ])

        return bureaus
      }, {})
    case FETCH_REPORT_PENDING:
    case FETCH_REPORT_ERROR:
    default:
      return state
  }
}

export default combineReducers({
  allIds,
  byId,
})
