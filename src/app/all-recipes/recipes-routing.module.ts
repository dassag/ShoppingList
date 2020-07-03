import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRecipesComponent } from './all-recipes.component';
import { RecipeResolverService } from '../shared/recipe-resolver.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';


const routes:Routes=[
    {path:'recipes',component:AllRecipesComponent,resolve:[RecipeResolverService], children:[
        {path:'',component:RecipeStartComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailsComponent, resolve:[RecipeResolverService]},
        {path:':id/edit',component:RecipeEditComponent, resolve:[RecipeResolverService]}
      ]}
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{

}