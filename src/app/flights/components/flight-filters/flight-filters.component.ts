import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  input,
} from '@angular/core';
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
  value: number;
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
  minPrice = input<number>(0);
  maxPrice = input<number>(10000);

  @Output() filtersChange = new EventEmitter<any>();

  flightFilterForm!: FormGroup;

  sortOptions: SortOption[] = [
    { label: 'Price (Lowest)', value: 'priceAsc' },
    { label: 'Price (Highest)', value: 'priceDesc' },
    { label: 'Departure time (Earliest)', value: 'departureAsc' },
    { label: 'Departure time (Latest)', value: 'departureDesc' },
  ];

  stopsOptions: StopOption[] = [
    { label: 'All stops', value: -1 },
    { label: 'Nonstop', value: 0 },
    { label: '1 stop', value: 1 },
    { label: '2 stops', value: 2 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.flightFilterForm = this.fb.group({
      sortBy: ['priceAsc'],
      priceRange: [[this.minPrice(), this.maxPrice()]],
      stops: [[-1]],
    });

    this.flightFilterForm.valueChanges.subscribe((value) => {
      this.filtersChange.emit(value);
    });
  }
}
