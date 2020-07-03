import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { AllRecipeService } from '../allRecipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  chosenRecipe:Recipe;
  id:number;

  constructor(private recipeService:AllRecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(){
    // this.route.data.subscribe((recipes:Recipe[])=>{
    //   this.recipeService.setRecipes(recipes);
    // });
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.chosenRecipe=this.recipeService.getRecipeById(this.id);
      }
    );
  }

  onAddToShoppingCart(){
    this.recipeService.addIngredientToCart(this.chosenRecipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
