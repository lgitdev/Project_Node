import {Component, OnInit} from '@angular/core';
import {Transaction} from "../transaction";
import {NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {TransactionsService} from "../transactions.service";
import {EditTransactionFormComponent} from "../edit-transaction-form/edit-transaction-form.component";
//This Angular component handles the editing of a specific transaction.
@Component({
  selector: 'app-edit-transaction',
  imports: [
    NgIf,
    EditTransactionFormComponent
  ],
  template: `
    <app-edit-transaction-form *ngIf="transaction" [transaction]="transaction"></app-edit-transaction-form>
  `,
  standalone: true,
  styles: ``
})
export class EditTransactionComponent implements OnInit {

  transaction: Transaction|undefined;
  constructor(private route: ActivatedRoute,
              private transactionsService: TransactionsService) {
  }

  //Initialization of the component
  ngOnInit() {
    const transactionId: string | null = this.route.snapshot.paramMap.get('id');
    if (transactionId) {
      this.transactionsService
          .getTransactionById(+transactionId)
          .subscribe((transaction) => {
            this.transaction = transaction;
          });
    }
  }

}
