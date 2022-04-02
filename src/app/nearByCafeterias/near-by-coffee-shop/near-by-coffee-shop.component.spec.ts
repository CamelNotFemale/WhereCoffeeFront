import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByCoffeeShopComponent } from './near-by-coffee-shop.component';

describe('NearByCoffeeShopComponent', () => {
  let component: NearByCoffeeShopComponent;
  let fixture: ComponentFixture<NearByCoffeeShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearByCoffeeShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearByCoffeeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
