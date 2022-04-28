import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipClaimComponent } from './ownership-claim.component';

describe('OwnershipClaimComponent', () => {
  let component: OwnershipClaimComponent;
  let fixture: ComponentFixture<OwnershipClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnershipClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
