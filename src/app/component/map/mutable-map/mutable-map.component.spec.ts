import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutableMapComponent } from './mutable-map.component';

describe('MutableMapComponent', () => {
  let component: MutableMapComponent;
  let fixture: ComponentFixture<MutableMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutableMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutableMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
