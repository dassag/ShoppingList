import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartEditComponent } from './shopping-cart-edit/shopping-cart-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        ShoppingCartComponent,
        ShoppingCartEditComponent,
    ],
    imports:[
        RouterModule.forChild([
            {path:'cart',component:ShoppingCartComponent},
        ]),
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ShoppingCartModule{}