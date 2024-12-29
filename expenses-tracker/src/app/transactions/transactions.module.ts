import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {ListTransactionComponent} from "./list-transaction/list-transaction.component";
import {DetailTransactionComponent} from "./detail-transaction/detail-transaction.component";
import {AllTransactionsComponent} from "./all-transactions/all-transactions.component";
import {EditTransactionComponent} from "./edit-transaction/edit-transaction.component";
import {NewTransactionFormComponent} from "./new-transaction-form/new-transaction-form.component";
import {DeleteSuccessComponent} from "./delete-success/delete-success.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {AgGridComponent} from "./ag-grid/ag-grid.component";

//Defining routes for the various transaction pages
export const transactionRoutes: Routes = [
  { path:'dashboard', component: ListTransactionComponent},
  { path:'detail/:id', component: DetailTransactionComponent},
  { path:'transactions', component: AllTransactionsComponent},
  { path:'edit/:id', component:EditTransactionComponent},
  { path: 'new-transaction', component: NewTransactionFormComponent },
  { path: 'delete-success', component: DeleteSuccessComponent },
  { path: 'statistics', component: StatisticsComponent},
  { path: 'transactions-grid', component: AgGridComponent },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TransactionsModule { }
