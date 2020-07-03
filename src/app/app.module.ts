import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { RecipeDetailsComponent } from './all-recipes/recipe-details/recipe-details.component';
import { RecipeListsComponent } from './all-recipes/recipe-lists/recipe-lists.component';
import { RecipeItemsComponent } from './all-recipes/recipe-lists/recipe-items/recipe-items.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartEditComponent } from './shopping-cart/shopping-cart-edit/shopping-cart-edit.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { ShoppingService } from './shopping-cart/shopping.service';
import { RecipeStartComponent } from './all-recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './all-recipes/recipe-edit/recipe-edit.component';
import { AllRecipeService } from './all-recipes/allRecipes.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DynamicAlertComponent } from './shared/dynamic-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllRecipesComponent,
    RecipeDetailsComponent,
    RecipeListsComponent,
    RecipeItemsComponent,
    ShoppingCartComponent,
    ShoppingCartEditComponent,
    DropDownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    DynamicAlertComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingService,AllRecipeService,
    {provide:HTTP_INTERCEPTORS, 
      useClass:AuthInterceptorService, 
      multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
