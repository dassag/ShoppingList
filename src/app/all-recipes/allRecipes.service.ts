import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-cart/shopping.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingActions from '../shopping-cart/store/shopping-cart.actions'; 

@Injectable()
export class AllRecipeService{
    recipeSelected=new EventEmitter<Recipe>();
    recipesChanged=new Subject<Recipe[]>();
    // recipes: Recipe[]=[
    //     new Recipe('Pizza',
    //     'Cheezy Chicken Pizza',
    //     'https://image.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg',
    //     [new Ingredient('meat',30,2),
    //     new Ingredient('Flour',18,3),
    //     new Ingredient('Cheese',55,10)
    //     ]),
    //     new Recipe('Chicken leg Fry',
    //     'Fried chicken legs',
    //     'https://www.foodvedam.com/wp-content/uploads/2016/09/Chicken-leg-fry.jpg',
    //     [new Ingredient('meat',30,2),
    //     new Ingredient('Flour',18,3),
    //     new Ingredient('oil',65,4)  
    //     ])
    // ];
    private recipes: Recipe[]=[];

    constructor(private shoppingService:ShoppingService, 
        private store:Store<{shoppingReducer:{ingredients:Ingredient[]}}>){}

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipeById(id:number){
        return this.recipes[id];
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(id:number,newRecipe:Recipe){
        this.recipes[id]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id:number){
        this.recipes.splice(id,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    addIngredientToCart(ingredient:Ingredient[]){
        // this.shoppingService.addIngredient(ingredient);
        this.store.dispatch(new ShoppingActions.AddIngredients(ingredient));
    }
    
}