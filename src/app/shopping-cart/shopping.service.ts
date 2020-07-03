import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


export class ShoppingService{
    //private ingredientsChanged=new EventEmitter<Ingredient[]>();
     ingredientsChanged=new Subject<Ingredient[]>();
     editItemStart=new Subject<number>();
    private ingredients:Ingredient[]=
    [
        new Ingredient('avocado',50,3),
        new Ingredient('cherry',53,2)
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index:number){
          return this.ingredients[index];
      }

      onAddIngredients(ingredient:Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredient(ingredient:Ingredient[]){
          this.ingredients.push(...ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index:number,newIngredient:Ingredient){
          this.ingredients[index]=newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index:number){
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      
}