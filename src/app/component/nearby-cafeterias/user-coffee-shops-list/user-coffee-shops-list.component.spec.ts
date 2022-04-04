import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCoffeeShopsListComponent } from './user-coffee-shops-list.component';

describe('UserCoffeeShopsListComponent', () => {
  let component: UserCoffeeShopsListComponent;
  let fixture: ComponentFixture<UserCoffeeShopsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCoffeeShopsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCoffeeShopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
