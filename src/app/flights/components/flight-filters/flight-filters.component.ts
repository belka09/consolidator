import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

interface SortOption {
  label: string;
  value: string;
}

interface StopOption {
  label: string;
  value: string;
}

@Component({
  standalone: true,
  selector: 'app-flight-filters',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    SliderModule,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './flight-filters.component.html',
  styleUrls: ['./flight-filters.component.scss'],
})
export class FlightFiltersComponent implements OnInit {
  flightFilterForm!: FormGroup;

  sortOptions: SortOption[] = [
    { label: 'Price (Lowest)', value: 'priceAsc' },
    { label: 'Price (Highest)', value: 'priceDesc' },
    { label: 'Departure time (Earliest)', value: 'departureAsc' },
    { label: 'Departure time (Latest)', value: 'departureDesc' },
  ];

  initialPriceRange = [3386.81, 4440.81];

  stopsOptions: StopOption[] = [
    { label: 'All stops', value: 'allStops' },
    { label: 'Nonstop', value: 'nonstop' },
    { label: '1 stop', value: '1stop' },
    { label: '2 stops', value: '2stops' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.flightFilterForm = this.fb.group({
      sortBy: ['priceAsc'],
      priceRange: [this.initialPriceRange],
      stops: [['allStops']],
    });

    this.flightFilterForm.valueChanges.subscribe((value) => {
      console.log('Filter form changed:', value);
    });
  }

  onSubmit() {
    console.log('Final form values:', this.flightFilterForm.value);
  }
}
