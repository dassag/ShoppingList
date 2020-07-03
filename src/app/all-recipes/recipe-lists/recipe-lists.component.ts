import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { AllRecipeService } from '../allRecipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-lists',
  templateUrl: './recipe-lists.component.html',
  styleUrls: ['./recipe-lists.component.css']
})
export class RecipeListsComponent implements OnInit, OnDestroy {
  //@Output() recipeDisplayed=new EventEmitter<Recipe>()
//   recipes: Recipe[]=[
//     new Recipe('test1','test recipe1','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),
//     new Recipe('test2','test recipe2','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'),  
// ];
recipeSubscription:Subscription;

recipes: Recipe[];

  constructor(private allRecipes:AllRecipeService,
    private router:Router,
    private route:ActivatedRoute) { }
  

  ngOnInit() {
    this.recipeSubscription=this.allRecipes.recipesChanged
    .subscribe((recipe:Recipe[])=>{
      this.recipes=recipe;
    });
    this.recipes=this.allRecipes.getRecipes();
  }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeDisplayed.emit(recipe);
  // }
  editNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
