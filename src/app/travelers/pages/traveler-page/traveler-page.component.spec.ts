import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerPageComponent } from './traveler-page.component';

describe('TravelerPageComponent', () => {
  let component: TravelerPageComponent;
  let fixture: ComponentFixture<TravelerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
