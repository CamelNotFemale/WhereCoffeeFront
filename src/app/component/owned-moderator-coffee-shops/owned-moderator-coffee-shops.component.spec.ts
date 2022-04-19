import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedModeratorCoffeeShopsComponent } from './owned-moderator-coffee-shops.component';

describe('OwnedModeratorCoffeeShopsComponent', () => {
  let component: OwnedModeratorCoffeeShopsComponent;
  let fixture: ComponentFixture<OwnedModeratorCoffeeShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedModeratorCoffeeShopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedModeratorCoffeeShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
