export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SCORES':
      return [...state, action.payload]
    default:
      return state
  }
}
