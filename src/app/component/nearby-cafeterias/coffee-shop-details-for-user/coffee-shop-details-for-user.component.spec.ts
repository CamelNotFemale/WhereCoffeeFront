import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopDetailsForUserComponent } from './coffee-shop-details-for-user.component';

describe('CoffeeShopDetailsForUserComponent', () => {
  let component: CoffeeShopDetailsForUserComponent;
  let fixture: ComponentFixture<CoffeeShopDetailsForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeShopDetailsForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopDetailsForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
