export const initialState = {
    basket: [],
    user: null,
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

function reducer(state, action) {
    console.log(action);
    switch(action.type){
        case 'ADD_TO_BASKET':
            return { 
                ...state,
                basket: [...state.basket, action.item] 
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            };

        case 'REMOVE_FROM_BASKET':
            let newbasket = [...state.basket];
            const index = state.basket.findIndex((basketitem) => basketitem.id === action.id)

            if (index >= 0){
                newbasket.splice(index, 1);
            } else {
                console.warn(
                    `can't remove product (id: ${action.id}) as it is not in the basket.`
                );
            }

            return {
                ...state, basket: newbasket
            };

        case 'SET_USER':
            return {
                ...state, user: action.user
            }

        default:
            return state;
    }
}

export default reducer;