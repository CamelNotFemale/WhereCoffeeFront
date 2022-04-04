import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmutableMapComponent } from './immutable-map.component';

describe('UnmutableMapComponent', () => {
  let component: ImmutableMapComponent;
  let fixture: ComponentFixture<ImmutableMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmutableMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmutableMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
