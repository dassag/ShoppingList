import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule }from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingService } from './shopping-cart/shopping.service'; 
import { AllRecipeService } from './all-recipes/allRecipes.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipesRoutingModule } from './all-recipes/recipes-routing.module';
import { AllRecipesModule } from './all-recipes/allRecipes.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartReducers } from './shopping-cart/store/shopping-cart.reducers';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingReducer:ShoppingCartReducers}),
    AllRecipesModule,
    ShoppingCartModule,
    AppRoutingModule,
    RecipesRoutingModule,
    AuthModule,
    SharedModule
  ],

  providers: [ShoppingService,AllRecipeService,
    {provide:HTTP_INTERCEPTORS, 
      useClass:AuthInterceptorService, 
      multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
