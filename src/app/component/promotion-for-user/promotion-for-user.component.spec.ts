import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionForUserComponent } from './promotion-for-user.component';

describe('PromotionForUserComponent', () => {
  let component: PromotionForUserComponent;
  let fixture: ComponentFixture<PromotionForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
