import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingActions from './shopping-cart.actions'

const initialState={
     ingredients:[
        new Ingredient('avocado',50,3),
        new Ingredient('cherry',53,2)
      ]
};

export function ShoppingCartReducers(state=initialState,action:ShoppingActions.shoppingCartType){
    switch(action.type){
        case ShoppingActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients,action.receivedIngredient]
                 //new array of ingresients with same old data  
            };
            case ShoppingActions.ADD_INGREDIENTS:
                return {
                    ...state,
                    ingredients:[...state.ingredients, ...action.receivedIngredients]
                };
            default:
                 return state;
    }
}