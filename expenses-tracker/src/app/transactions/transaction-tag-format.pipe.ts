import { Pipe, PipeTransform } from '@angular/core';

// Defines the pipe and assigns it a name for use in templates.

@Pipe({
  standalone: true,
  name: 'transactionTagFormat'
})
export class TransactionTagFormatPipe implements PipeTransform {

  transform(tag: string): string {
    let colorClass: string;

    switch (tag) {
      case 'Refund':
        colorClass = 'badge bg-primary'; // Blue Bootstrap
        break;
      case 'Hobbies':
        colorClass = 'badge bg-warning text-dark'; // Yellow Bootstrap
        break;
      case 'Transport':
        colorClass = 'badge bg-success'; // Green Bootstrap
        break;
      case 'Income':
        colorClass = 'badge bg-info text-dark'; // Cyan Bootstrap
        break;
      case 'Restaurant':
        colorClass = 'badge bg-danger'; // Red Bootstrap
        break;
      default:
        colorClass = 'badge bg-secondary'; // Grey Bootstrap
        break;
    }

    return colorClass;
  }

}
