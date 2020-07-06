import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT='ADD_INGREDIENT';
export const ADD_INGREDIENTS='ADD_INGREDIENTS';

//type script feature to combine different types into one
export type shoppingCartType= AddIngredient | AddIngredients;

export class AddIngredient implements Action{
    readonly type=ADD_INGREDIENT;
    constructor(public receivedIngredient:Ingredient){     
    }
}

export class AddIngredients implements Action{
    readonly type=ADD_INGREDIENTS;
    constructor(public receivedIngredients:Ingredient[]){}
}