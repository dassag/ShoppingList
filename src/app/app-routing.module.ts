import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeStartComponent } from './all-recipes/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './all-recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './all-recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './shared/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [{path:'',redirectTo:'auth',pathMatch:'full',canActivate:[AuthGuardService]},
  {path:'recipes',component:AllRecipesComponent,resolve:[RecipeResolverService], children:[
    {path:'',component:RecipeStartComponent},
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailsComponent, resolve:[RecipeResolverService]},
    {path:':id/edit',component:RecipeEditComponent, resolve:[RecipeResolverService]}
  ]},
{path:'cart',component:ShoppingCartComponent},
{path:'auth',component:AuthComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
