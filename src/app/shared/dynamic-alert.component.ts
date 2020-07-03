import { Component, Input } from '@angular/core';
import { Z_FIXED } from 'zlib';

@Component({
    selector:'dynamic-alert',
    templateUrl:'./dynamic-alert.component.html',
    styleUrls:['./alert.component.css']
})
export class DynamicAlertComponent{
    @Input() message:string;

}