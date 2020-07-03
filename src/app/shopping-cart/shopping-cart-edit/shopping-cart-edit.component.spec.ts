import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartEditComponent } from './shopping-cart-edit.component';

describe('ShoppingCartEditComponent', () => {
  let component: ShoppingCartEditComponent;
  let fixture: ComponentFixture<ShoppingCartEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
