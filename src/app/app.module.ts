import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { ShoppingService } from './shopping-cart/shopping.service'; 
import { AllRecipeService } from './all-recipes/allRecipes.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DynamicAlertComponent } from './shared/dynamic-alert.component';
import { RecipesRoutingModule } from './all-recipes/recipes-routing.module';
import { AllRecipesModule } from './all-recipes/allRecipes.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropDownDirective,
    DynamicAlertComponent
  ],
  imports: [
    AppRoutingModule,
    RecipesRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AllRecipesModule,
    ShoppingCartModule,
    AuthModule
  ],
  providers: [ShoppingService,AllRecipeService,
    {provide:HTTP_INTERCEPTORS, 
      useClass:AuthInterceptorService, 
      multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
