import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf} from "@angular/common";
import {Transaction} from "../transaction";
import {TransactionsService} from "../transactions.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BorderDirective} from "../border.directive";

/*
 * This Angular component manages all transactions, including searching, filtering, sorting, and deleting transactions.
 * It communicates with the TransactionsService to fetch and manage transaction data.
 */

@Component({
  selector: 'app-all-transactions',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgClass,
    FormsModule,
    BorderDirective
  ],
  templateUrl: './all-transactions.component.html',
  standalone: true,
  styles: ``
})
export class AllTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  searchTerm: string = '';
  filteredTransactions: Transaction[]  = [];
  showIncome: boolean = true;
  showExpense: boolean = true;

  constructor(private router:Router,
              private transactionsService: TransactionsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to query parameters and update filters
    this.route.queryParams.subscribe((params) => {
      this.showIncome = params['showIncome'] === 'true';
      this.showExpense = params['showExpense'] === 'true';
      this.filterTransactions();
    });
    // Subscribe to router events to reload data on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadTransactions(); // reload data every time
      }
    });
    this.loadTransactions();
  }

  // Loads transactions from the service and applies filtering
  private loadTransactions() {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filterTransactions();
      }});
  }

  // Returns transactions sorted by date in descending order
  getSortedTransactions(): Transaction[] {
    return this.transactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Navigates to the details page of a specific transaction
  goToTransaction(transaction:Transaction){
    this.router.navigate(['/detail',transaction.id]);
  }

  // Filters transactions based on the search term and the income/expense filters
  filterTransactions() {
    const term = this.searchTerm.toLowerCase();
    const sortedTransactions = this.getSortedTransactions();
    this.filteredTransactions = sortedTransactions.filter(transaction => {
      // Checks if the transaction matches any of the search criteria
      const matchesDescription = transaction.description?.toLowerCase().includes(term) || false;
      const matchesCategory = transaction.category?.toLowerCase().includes(term) || false;
      const matchesTags = transaction.tags?.some(tag => tag.toLowerCase().includes(term)) || false;
      const matchesAmount = transaction.amount?.toString().includes(term) || false;
      //Combines the search conditions
      const matchesSearchTerm =
          matchesDescription || matchesCategory || matchesTags || matchesAmount;

      // Checks if the transaction matches the Income/Expense checkboxes
      const matchesIncome = this.showIncome && !transaction.isExpense;
      const matchesExpense = this.showExpense && transaction.isExpense;

      // Combine the two conditions
      return matchesSearchTerm && (matchesIncome || matchesExpense);
    });
  }

  // Deletes a transaction and navigates to a success page
  deleteTransaction(transactionId?: number) {
    if (transactionId !== undefined) {
      this.transactionsService.deleteTransaction(transactionId).subscribe({
        next: () => {
          this.router.navigate(['/delete-success']);
        },
        error: (err) => {
          console.error('Failed to delete transaction:', err);
          alert('An error occurred while deleting the transaction.');
        },
      });
    } else {
      alert('Transaction ID is missing.');
    }
  }
}
