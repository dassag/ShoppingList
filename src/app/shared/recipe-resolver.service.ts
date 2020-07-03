import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../all-recipes/recipe.model';
import { Injectable, OnInit } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Observable, Subscription } from 'rxjs';
import { AllRecipeService } from '../all-recipes/allRecipes.service';
import { AuthService } from '../auth/auth.service';



@Injectable({providedIn:'root'})
export class RecipeResolverService implements OnInit ,Resolve<Recipe[]>{
    userSub: Subscription;
    isAuthenticated:boolean;

    constructor(private dataStorService:DataStorageService,
        private recipeService:AllRecipeService,
        private auth:AuthService){}

        ngOnInit(){
            this.userSub=this.auth.user.subscribe(userData=>{
             this.isAuthenticated= !userData? false:true ;
            });
           }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | 
    Observable<Recipe[]> | Promise<Recipe[]> {
        
        console.log('In Resolve:')
         const recipes=this.recipeService.getRecipes();
            if(recipes.length===0){
                return this.dataStorService.onGetRecipes();
            }

         return recipes;

}

}