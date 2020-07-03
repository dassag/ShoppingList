import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[];
  ingredientSubscription:Subscription;

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(){
    this.ingredients=this.shoppingService.getIngredients();
    this.ingredientSubscription=this.shoppingService.ingredientsChanged
    .subscribe((ingredient:Ingredient[])=>{
      this.ingredients=ingredient;
    });
  }

  onIngredientAdd(ingredient:Ingredient){
    this.ingredients.push(ingredient);
  }

  onEditItem(index:number){
    this.shoppingService.editItemStart.next(index);
  }
  ngOnDestroy():void{
    this.ingredientSubscription.unsubscribe();
  }

}
