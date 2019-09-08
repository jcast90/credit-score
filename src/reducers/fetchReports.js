export default ( state=[], action) => {
    switch(action.type){
        case 'FETCH_REPORT':
            return [...state, action.payload];
        default:
            return state
    }
}