import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AllRecipeService } from '../allRecipes.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm:FormGroup;
  

  constructor(private route:ActivatedRoute,
    private recipeService:AllRecipeService,
    private router:Router)
     { }

  ngOnInit(){
    // this.route.data.subscribe((recipes:Recipe[])=>{
    //   this.recipeService.setRecipes(recipes);
    // });
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    );
  }
  onSubmit(){
    // const recipe= new Recipe(
    //   this.recipeForm.value('name'),
    //   this.recipeForm.value('description'),
    //   this.recipeForm.value('imagePath'),
    //   this.recipeForm.value['ingredients']
    // );
    if(this.editMode){
    this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.editMode=false;
    this.recipeForm.reset();
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(id:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
    // (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
          'amount':new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'price':new FormControl(0,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([],[Validators.required]);
    if(this.editMode){
     const recipe= this.recipeService.getRecipeById(this.id);
     recipeName=recipe.name;
     recipeImagePath=recipe.imagePath;
     recipeDescription=recipe.description;
     if(recipe['ingredients']){
       for(let ingredient of recipe.ingredients)
       {
         recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name),
          'amount':new FormControl(ingredient.amount),
          'price':new FormControl(ingredient.price)
         }))
         ;
       }
     }
  }

    this.recipeForm= new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }

}
