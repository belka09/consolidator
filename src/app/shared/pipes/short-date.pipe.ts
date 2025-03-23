import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDateFormat',
})
export class ShortDateFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const parts = value.split('-');
    if (parts.length < 3) {
      return value;
    }

    const [yearStr, monthStr, dayStr] = parts;
    const monthNum = parseInt(monthStr, 10);

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    if (monthNum < 1 || monthNum > 12) {
      return value;
    }

    const monthName = monthNames[monthNum - 1];
    return `${monthName} ${dayStr}`;
  }
}
