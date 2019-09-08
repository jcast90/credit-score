import isApiError from './isApiError'

describe('isApiError', () => {
  describe('error status', () => {
    it('should return false', () => {
      expect(isApiError(400)).toEqual(true)
    })
  })

  describe('success status', () => {
    it('should return true', () => {
      expect(isApiError(200)).toEqual(false)
    })
  })
})
