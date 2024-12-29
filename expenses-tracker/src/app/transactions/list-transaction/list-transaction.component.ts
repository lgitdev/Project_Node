import {Component, OnInit} from '@angular/core';
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {BorderDirective} from "../border.directive";
/*
 * This Angular component displays a list of transactions
 * including both income and expense transactions.
 */
@Component({
  selector: 'app-list-transaction',
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    NgClass,
    BorderDirective
  ],
  templateUrl: './list-transaction.component.html',
  standalone: true,
  styles: ``
})
export class ListTransactionComponent implements OnInit {
  transactions: Transaction[];
  filteredTransactions: Transaction[] = [];
  incomeTransactions: Transaction[] = [];
  expenseTransactions: Transaction[] = [];

  constructor(private transactionsService: TransactionsService,
              private router:Router) {}

  // Load transactions when the component is initialized
  ngOnInit() {
    this.loadTransactions();
  }

  // Loads the transactions and updates filtered transactions
  private loadTransactions() {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.updateFilteredTransactions(); // Mettre à jour les transactions filtrées et triées
      },
      error: (err) => {
        console.error('Failed to load transactions:', err);
      }
    });
  }

  // Updates filtered transactions based on criteria
  private updateFilteredTransactions() {
    this.filteredTransactions = this.getFilteredAndSortedTransactions();
    this.incomeTransactions = this.filteredTransactions.filter(
        (transaction) => !transaction.isExpense
    );
    this.expenseTransactions = this.filteredTransactions.filter(
        (transaction) => transaction.isExpense
    );
  }

  // Method to display only the recent transactions, and from newest to oldest
  private getFilteredAndSortedTransactions(): Transaction[] {
    // extraxct the current date and last month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const previousMonthDate = new Date(currentYear, currentMonth - 1);

    return this.transactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          const transactionMonth = transactionDate.getMonth();
          const transactionYear = transactionDate.getFullYear();

          return (
              (transactionYear === currentYear && transactionMonth === currentMonth) ||
              (transactionYear === previousMonthDate.getFullYear() &&
                  transactionMonth === previousMonthDate.getMonth())
          );
        })
        // sort from the newest to the oldest
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Navigates to the detailed view of a selected transaction
  goToTransaction(transaction:Transaction){
    this.router.navigate(['/detail',transaction.id]);
  }

  // Redirects to the transaction list with specific query parameters
  redirectToTransactions() {
    this.router.navigate(['/transactions'], { queryParams: { showIncome: true, showExpense: true } });

  }

  // Calculates the net total of income minus expenses
  getNetTotal(): number {
    const totalIncome = this.incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalExpense = this.expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return totalIncome - totalExpense;
  }


}
