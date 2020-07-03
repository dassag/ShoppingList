import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';


@Directive({
    selector:'[appDropDown]' /*to be used in the html template*/
})
export class DropDownDirective{
    @HostBinding('class.open')isExpand=false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isExpand = this.elRef
        .nativeElement.contains(event.target) ? !this.isExpand : false;
      }
      constructor(private elRef: ElementRef) {}
}