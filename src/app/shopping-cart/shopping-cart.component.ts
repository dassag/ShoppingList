import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{

  ingredients:Observable<{ingredients:Ingredient[]}>;
  // ingredientSubscription:Subscription;

  constructor(private shoppingService:ShoppingService,
              private store:Store<{shoppingReducer:{ingredients:Ingredient[]}}>
              ) { }

  ngOnInit(){
    this.ingredients=this.store.select('shoppingReducer');
    // this.ingredients=this.shoppingService.getIngredients();
    // this.ingredientSubscription=this.shoppingService.ingredientsChanged
    // .subscribe((ingredient:Ingredient[])=>{
    //   this.ingredients=ingredient;
    // });
  }

  // onIngredientAdd(ingredient:Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index:number){
    this.shoppingService.editItemStart.next(index);
  }
  

}
