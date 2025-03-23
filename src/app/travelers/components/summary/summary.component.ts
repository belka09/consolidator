import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  readonly price = input<number>();

  readonly priceInteger = computed(() => {
    const value = this.price();
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toFixed(2).split('.')[0];
    }
    return '0';
  });

  readonly priceFraction = computed(() => {
    const value = this.price();
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toFixed(2).split('.')[1];
    }
    return '00';
  });
}
