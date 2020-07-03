import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';

@NgModule({
    declarations:[AuthComponent,LoadingSpinnerComponent],

    imports:[CommonModule,FormsModule,RouterModule.forChild([
        {path:'auth',component:AuthComponent}
    ]),
    FormsModule
    ]
})
export class AuthModule{}