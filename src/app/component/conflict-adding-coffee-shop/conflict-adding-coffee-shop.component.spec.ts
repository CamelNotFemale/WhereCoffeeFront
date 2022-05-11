import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictAddingCoffeeShopComponent } from './conflict-adding-coffee-shop.component';

describe('ConflictAddingCoffeeShopComponent', () => {
  let component: ConflictAddingCoffeeShopComponent;
  let fixture: ComponentFixture<ConflictAddingCoffeeShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConflictAddingCoffeeShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictAddingCoffeeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
