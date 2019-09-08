import { FETCH_REPORT_SUCCESS } from '../actions'
import bureauReducer from './bureaus'
import faker from 'faker'

/**
 * Mocks reports data
 * TODO: create a test factory
 */
export const generateMockReports = (size = 3) => {
  return [...Array(size)].map(idx => ({
    score_details: [
      {
        credit_score_id: faker.random.uuid(),
        bureau: faker.random.arrayElement([
          'Equifax',
          'Experian',
          'TransUnion',
        ]),
        model: faker.random.word(),
        score_rating: faker.random.arrayElement(['Excellent', 'OK', 'Poor']),
        score: faker.random.number({ min: 500, max: 800 }),
      },
    ],
  }))
}

describe('reducers', () => {
  describe('bureau reducer', () => {
    it('should return default state', () => {
      expect(bureauReducer({}, undefined)).toMatchObject({
        allIds: [],
        byId: {},
      })
    })

    describe('handling FETCH_REPORT_SUCCESS', () => {
      let reducer
      let mockData
      beforeEach(() => {
        mockData = generateMockReports(5)
        const action = {
          type: FETCH_REPORT_SUCCESS,
          payload: [...mockData],
        }
        reducer = bureauReducer({}, action)
      })

      it('should map out allIds', () => {
        expect(reducer.allIds).toHaveLength(5)
      })

      it('should map out byId', () => {
        expect(Object.keys(reducer.byId)).toHaveLength(5)
        expect(Object.values(reducer.byId)).toHaveLength(5)

        // FIXME: loose test assertion, need to reinforce test factory
        const expectedMapping = Object.keys(reducer.byId).reduce((byId, id) => {
          byId[id] = {
            bureau: expect.any(String),
            model: expect.any(String),
            score: expect.any(Number),
            score_rating: expect.any(String),
          }
          return byId
        }, {})

        expect(reducer.byId).toMatchObject(expectedMapping)
      })
    })
  })
})
