import { Injectable } from '@angular/core';
import {Transaction} from "./transaction";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'http://localhost:4200/api/transactions'

  constructor(private http:HttpClient) { }

  // Retrieves all transactions from the API
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
  // Return all the expenses
  getExpenses(): Observable<Transaction[]> {
    return this.getTransactions().pipe(
        map((transactions: Transaction[]) => transactions.filter((transaction) => transaction.isExpense))
    );
  }

  // Return all the incomes
  getIncomes(): Observable<Transaction[]> {
    return this.getTransactions().pipe(
        map((transactions) => transactions.filter((transaction) => !transaction.isExpense))
    );
  }

  // Calculate the balance of our database
  calculateBalance(): Observable<number> {
    return this.getTransactions().pipe(
        map((transactions) => {
          const incomes = transactions
              .filter((transaction) => !transaction.isExpense)
              .reduce((total, transaction) => total + transaction.amount, 0);
          const expenses = transactions
              .filter((transaction) => transaction.isExpense)
              .reduce((total, transaction) => total + transaction.amount, 0);
          return incomes - expenses;
        })
    );
  }

  // Find a transaction using its ID
  getTransactionById(transactionID: number): Observable<Transaction | undefined> {
    return this.getTransactions().pipe(
        map((transactions) => transactions.find((transaction) => transaction.id === transactionID))
    );
  }
  // Returns the list of transaction categories
  getCategoryList():string[]{
    return [
      'Salary',
      'Food',
      'Transport',
      'Hobbies',
      'Rent',
      'Utilities',
      'Healthcare',
      'Shopping',
      'Investment',
      'Gift',
      'Others'
    ];
  }
  // Returns the list of possible payment methods
  getPaymentMethods(): string[]{
    return ["Transfer",'Cash',"Card"];
  }
  // Updates an existing transaction
  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transaction.id}`, transaction);
  }
  //Delete a transaction by its ID
  deleteTransaction(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Create a new transaction
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  // Retrieves breakdown of expenses by category
  getExpensesByCategory(): Observable<{ category: string; total: number }[]> {
    return this.getExpenses().pipe(
        map((expenses) => {
          const categoryTotals: { [key: string]: number } = {};
          expenses.forEach((expense) => {
            if (!categoryTotals[expense.category]) {
              categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
          });
          return Object.entries(categoryTotals).map(([category, total]) => ({
            category,
            total,
          }));
        })
    );
  }

  // Recovers transactions by month (income/expenses)
  getMonthlyTransactions(): Observable<{ month: string; incomes: number; expenses: number }[]> {
    return this.getTransactions().pipe(
        map((transactions) => {
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const monthlyData: { [key: string]: { incomes: number; expenses: number } } = {};

          transactions.forEach((transaction) => {
            const date = new Date(transaction.date);
            const month = monthNames[date.getMonth()];
            if (!monthlyData[month]) {
              monthlyData[month] = { incomes: 0, expenses: 0 };
            }
            if (transaction.isExpense) {
              monthlyData[month].expenses += transaction.amount;
            } else {
              monthlyData[month].incomes += transaction.amount;
            }
          });

          return Object.entries(monthlyData).map(([month, { incomes, expenses }]) => ({
            month,
            incomes,
            expenses,
          }));
        })
    );
  }






}
