import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartEditComponent } from './shopping-cart-edit/shopping-cart-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        ShoppingCartComponent,
        ShoppingCartEditComponent,
    ],
    imports:[
        RouterModule.forChild([
            {path:'cart',component:ShoppingCartComponent},
        ]),
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ShoppingCartModule{}