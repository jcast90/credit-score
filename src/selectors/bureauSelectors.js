import { pick } from 'lodash'

export const getScores = state => {
  const {
    bureaus: { byId },
  } = state

  if (!(Object.values(byId) && Object.values(byId).length)) {
    return []
  }
  return Object.values(byId).map(bureau => pick(bureau, ['score', 'bureau']))
}
