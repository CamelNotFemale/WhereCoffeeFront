import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopsListComponent } from './coffee-shops-list.component';

describe('CoffeeShopsListComponent', () => {
  let component: CoffeeShopsListComponent;
  let fixture: ComponentFixture<CoffeeShopsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeShopsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeShopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
