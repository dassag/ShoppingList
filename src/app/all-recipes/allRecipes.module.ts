import { NgModule } from '@angular/core';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AllRecipesComponent } from './all-recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListsComponent } from './recipe-lists/recipe-lists.component';
import { RecipeItemsComponent } from './recipe-lists/recipe-items/recipe-items.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
//import { DropDownDirective } from '../shared/dropdown.directive';

@NgModule({
    declarations:[
        RecipeStartComponent,
        RecipeEditComponent,
        AllRecipesComponent,
        RecipeDetailsComponent,
        RecipeListsComponent,
        RecipeItemsComponent,
    ],
    imports:[
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ],
})
export class AllRecipesModule{

}