import { Component } from '@angular/core';
import {Transaction} from "../transaction";
import {EditTransactionFormComponent} from "../edit-transaction-form/edit-transaction-form.component";
import {NgIf} from "@angular/common";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";

/*
 *  This Angular component allows users to create a new transaction
 *  by providing a form to input transaction details.
 */
@Component({
  selector: 'app-new-transaction',
  imports: [
    EditTransactionFormComponent,
    NgIf
  ],
  template: `
    <app-edit-transaction-form *ngIf="transaction" [transaction]="transaction"
                               (submit)="createTransaction()"></app-edit-transaction-form>
  `,
  standalone: true,
  styles: ``
})
export class NewTransactionComponent {
// Initializes a new transaction with default values
  transaction: Transaction = {
    amount: 0,
    isExpense: true, // by default but we can change it
    date: new Date(),
    category: '',
    description: '',
    paymentMethod: '',
    tags: []
  };

  constructor(
      private transactionsService: TransactionsService,
      private router: Router
  ) {
  }
  // Creates a new transaction by sending data to the service
  createTransaction() {
    this.transactionsService.createTransaction(this.transaction).subscribe({
      next: () => {
        alert('Transaction created successfully!');
        this.router.navigate(['/transactions']);
      },
      error: (err: any) => {
        console.error('Failed to create transaction:', err);
        alert('An error occurred while creating the transaction.');
      }
    });
  }
}
