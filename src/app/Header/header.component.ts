import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import {  } from 'protractor';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AllRecipeService } from '../all-recipes/allRecipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../all-recipes/recipe.model';

@Component({
  selector: 'header-component',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  dataSub:Subscription;
  recipeSub:Subscription;
  userSub:Subscription;
  isAuthenticated=false;

  // @Output() featureSelected=new EventEmitter<string>();

  // onSelect(feature:string){
  //   this.featureSelected.emit(feature);
  // }
  constructor(private dataService:DataStorageService,
    private recipeService:AllRecipeService,
    private route:ActivatedRoute,
    private router:Router,
    private auth:AuthService){}

  ngOnInit(){
   this.userSub=this.auth.user.subscribe(userData=>{
    this.isAuthenticated= !userData? false:true ;
   });
  }
  onSave(){
    this.dataSub=this.dataService.onSaveRecipes().subscribe((recipes:Recipe[])=>{
      this.recipeService.setRecipes(recipes);
    })
  }
  onLogOut(){
    this.auth.logOut();
  }

  onGetData(){
    console.log('fetching..')
    this.recipeSub=this.dataService.onGetRecipes()
    .subscribe(recipes=>{console.log(recipes)});
    this.router.navigate(['/recipes'], {relativeTo:this.route})
  }
  ngOnDestroy(){
    this.dataSub.unsubscribe();
    this.recipeSub.unsubscribe();
  }
}
