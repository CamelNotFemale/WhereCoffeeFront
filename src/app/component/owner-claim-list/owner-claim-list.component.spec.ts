import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerClaimListComponent } from './owner-claim-list.component';

describe('OwnerClaimListComponent', () => {
  let component: OwnerClaimListComponent;
  let fixture: ComponentFixture<OwnerClaimListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerClaimListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
