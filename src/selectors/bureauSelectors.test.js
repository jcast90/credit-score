import { getScores } from './bureauSelectors'

describe('bureau selectors', () => {
  describe('getScores', () => {
    it('should return a mapped scores', () => {
      const mockState = {
        bureaus: {
          byId: {
            'TEST-00': {
              bureau: 'Test',
              score: 500,
            },
            'TEST-01': {
              bureau: 'Test01',
              score: 800,
            },
          },
        },
      }

      expect(getScores(mockState)).toEqual([
        { bureau: 'Test', score: 500 },
        { bureau: 'Test01', score: 800 },
      ])
    })
  })
})
