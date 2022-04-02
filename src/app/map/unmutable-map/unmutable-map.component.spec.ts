import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmutableMapComponent } from './unmutable-map.component';

describe('UnmutableMapComponent', () => {
  let component: UnmutableMapComponent;
  let fixture: ComponentFixture<UnmutableMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnmutableMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnmutableMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
