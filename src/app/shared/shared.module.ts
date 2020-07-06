import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        DropDownDirective
    ],
    imports:[CommonModule],
    exports:[
        LoadingSpinnerComponent,
        DropDownDirective,
        CommonModule
    ]
})
export class SharedModule{}