import { Component, OnInit, Input,} from '@angular/core';
import { Recipe } from './recipe.model';
import { AllRecipeService } from './allRecipes.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css'],
  
})
export class AllRecipesComponent implements OnInit {
  //@Input() chosenRecipe:Recipe;
  recipeToBeDisplayed:Recipe;
  constructor(private recipeService:AllRecipeService) { }

  ngOnInit(){
    this.recipeService.recipeSelected
    .subscribe(
      (recipes:Recipe)=>{this.recipeToBeDisplayed=recipes}
    )
  }

}
