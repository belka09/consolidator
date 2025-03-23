import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const parts = value.split(':');
    if (parts.length < 2) {
      return value;
    }

    const hourStr = parts[0];
    const minuteStr = parts[1];
    const hourNum = parseInt(hourStr, 10);

    const suffix = hourNum < 12 ? 'am' : 'pm';

    return `${hourStr}:${minuteStr}${suffix}`;
  }
}
