const INITIAL_STATE = {
    username: '',
    email: '',
    role: '',
    cart: [],
    id: 0
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                id : action.payload.id,
                username : action.payload.username,
                email : action.payload.email,
                role : action.payload.role,
                cart : action.payload.cart,
            }
        case 'LOGOUT':
            return INITIAL_STATE
        case 'ADD_TO_CART':
            return{
                ...state,
                cart: action.payload
            }
        default:
            return INITIAL_STATE
    }
}