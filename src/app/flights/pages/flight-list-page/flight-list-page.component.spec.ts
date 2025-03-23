import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListPageComponent } from './flight-list-page.component';

describe('FlightListPageComponent', () => {
  let component: FlightListPageComponent;
  let fixture: ComponentFixture<FlightListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
