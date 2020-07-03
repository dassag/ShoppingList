import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AllRecipeService } from '../all-recipes/allRecipes.service';
import { Recipe } from '../all-recipes/recipe.model';
import {map, tap,take, exhaustMap} from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:AllRecipeService,
    private auth:AuthService) { }


  onSaveRecipes(){
    const recipes=this.recipeService.getRecipes();
    return this.http.put('https://ng-recipebook-c4084.firebaseio.com/recipes.json',recipes);
  }

  onGetRecipes(){
        return this.http
          .get<Recipe[]>('https://ng-recipebook-c4084.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes)
        console.log(recipes);
        console.log('recipes');
      }));
  }
}
