import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsListForModeratorComponent } from './promotions-list-for-moderator.component';

describe('PromotionsListForModeratorComponent', () => {
  let component: PromotionsListForModeratorComponent;
  let fixture: ComponentFixture<PromotionsListForModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsListForModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsListForModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
