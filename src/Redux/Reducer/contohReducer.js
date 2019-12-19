const INITIAL_STATE = {
    halo: ''
}

export const contohReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'CONTOH':
            return{
                halo: 'hehe'
            }
        default:
            return state
    }
}