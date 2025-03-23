import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
})
export class DurationFormatPipe implements PipeTransform {
  transform(durationMinutes: number | null | undefined): string {
    if (!durationMinutes || durationMinutes <= 0) {
      return '0m';
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0 && minutes === 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }
}
