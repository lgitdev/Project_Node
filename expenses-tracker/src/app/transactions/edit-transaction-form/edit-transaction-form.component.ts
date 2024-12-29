import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
//This Angular component manages the form for editing a transaction.
@Component({
  selector: 'app-edit-transaction-form',
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './edit-transaction-form.component.html',
  standalone: true,
  styleUrls: ['edit-transaction-form.component.css']
})
export class EditTransactionFormComponent implements OnInit {
  categories: string[];
  paymentMethods: string[];
  tagsInput: string = '';

  @Input() transaction: Transaction;

  constructor(private transactionsService: TransactionsService,
              private router: Router) {
  }

  //Initializes categories, payment methods, and tags input when the component is loaded
  ngOnInit() {
    this.categories = this.transactionsService.getCategoryList();
    this.paymentMethods = this.transactionsService.getPaymentMethods();
    this.tagsInput = this.transaction.tags.join(', ');
  }

  //Handles form submission to update the transaction
  onSubmit(){
    if (this.transaction) {
      this.transactionsService.updateTransaction(this.transaction).subscribe({
        next: (updatedTransaction) => {
          this.router.navigate(["/detail", updatedTransaction.id]);
        },
        error: (err) => {
          alert('An error occurred while updating the transaction.');
        }
      });
    }
  }

  //Sets the selected category to the transaction
  selectCategory(category: string): void {
    this.transaction.category = category;
  }

  //Sets the selected payment method to the transaction
  selectPayment(payment: string) {
    this.transaction.paymentMethod = payment;
  }

  //Updates the tags of the transaction based on the input field
  updateTags(input: string): void {
    this.transaction.tags = input.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
  }

  //Removes a tag from the transaction by index
  removeTag(index: number): void {
    this.transaction.tags.splice(index, 1);
    this.tagsInput = this.transaction.tags.join(', '); // Update the input field
  }
}
