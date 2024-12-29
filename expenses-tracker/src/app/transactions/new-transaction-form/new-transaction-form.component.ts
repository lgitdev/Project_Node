import {Component, OnInit} from '@angular/core';
import { Transaction } from "../transaction";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

//This Angular component manages the creation of a new transaction form.
@Component({
  selector: 'app-new-transaction-form',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './new-transaction-form.component.html',
  standalone: true,
  styles: ``
})
export class NewTransactionFormComponent implements OnInit {
  categories: string[];
  paymentMethods: string[];
  tagsInput: string = '';
  transaction: Transaction;

  constructor(
      private transactionsService: TransactionsService,
      private router: Router
  ) {}

 /*
  * Initializes the component, retrieving available categories and payment methods
  * and setting default values for the transaction
  */
  ngOnInit() {
    this.categories = this.transactionsService.getCategoryList();
    this.paymentMethods = this.transactionsService.getPaymentMethods();

    this.transaction = {
      amount: 0,
      isExpense: true,
      date: new Date(),
      category: '',
      description: '',
      paymentMethod: '',
      tags: []
    };
  }

  // Handles form submission, creates the transaction and navigates to the transactions list
  onSubmit() {
    this.transactionsService.createTransaction(this.transaction).subscribe({
      next: (createdTransaction) => {
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        alert('An error occurred while creating the transaction.');
      }
    });
  }

  // Updates the transaction type (income or expense)
  selectType(isExpense: boolean): void {
    this.transaction.isExpense = isExpense;
  }

  // Sets the category of the transaction
  selectCategory(category: string): void {
    this.transaction.category = category;
  }

  // Sets the payment method for the transaction
  selectPayment(payment: string): void {
    this.transaction.paymentMethod = payment;
  }

  // Updates the tags list based on the user's input
  updateTags(input: string): void {
    this.transaction.tags = input.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  }

  // Removes a tag from the transaction
  removeTag(index: number): void {
    this.transaction.tags.splice(index, 1);
    this.tagsInput = this.transaction.tags.join(', '); // Met à jour le champ des tags
  }
}
