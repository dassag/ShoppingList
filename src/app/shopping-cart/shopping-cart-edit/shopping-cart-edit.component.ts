import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingActions from '../store/shopping-cart.actions';

@Component({
  selector: 'app-shopping-cart-edit',
  templateUrl: './shopping-cart-edit.component.html',
  styleUrls: ['./shopping-cart-edit.component.css']
})
export class ShoppingCartEditComponent implements OnInit, OnDestroy {

  //using local ref from template by viewchild
  // @ViewChild('nameInput',{static:false}) nameInputRef:ElementRef;
  // @ViewChild('amountInput',{static:false})amountInputRef:ElementRef;
  // @ViewChild('priceInput',{static:false})priceInputRef:ElementRef;

  //@Output() ingredientAdded=new EventEmitter<Ingredient>()
    // onAdd(){
  //   const ingredientName=this.nameInputRef.nativeElement.value;
  //   const ingredientPrice=this.priceInputRef.nativeElement.value;
  //   const ingredientAmount=this.amountInputRef.nativeElement.value;
  //   const ingredient=new Ingredient(ingredientName,ingredientPrice,ingredientAmount);
  //   this.shoppingService.onAddIngredients(ingredient);
  // }
  private editSub:Subscription;
   editMode=false;
  private editItemIndex:number;
  private editIngredient:Ingredient;
  
  @ViewChild('s',{static:false}) form:NgForm;
  constructor(private shoppingService:ShoppingService,
    private store:Store<{shoppingReducer:{ingredients:Ingredient[]}}>) { }
  

  ngOnInit(): void {
    this.editSub=this.shoppingService.editItemStart
    .subscribe((index:number)=>{
      this.editMode=true;
      this.editItemIndex=index;
      this.editIngredient=this.shoppingService.getIngredient(index);
      this.form.setValue({
        name:this.editIngredient.name,
        amount:this.editIngredient.amount,
        price:this.editIngredient.price
      });
    });
  }



  onSubmit(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.price,value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editItemIndex,newIngredient)
    }else{
      console.log(this.form);
      // this.shoppingService.onAddIngredients(newIngredient);
      this.store.dispatch(new ShoppingActions.AddIngredient(newIngredient));

    }
    this.editMode=false;
    this.form.reset();
    
  }
  onClear(){
    this.editMode=false;
    this.form.reset();
    //console.log(this.form);
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.editSub.unsubscribe();
  }

}
