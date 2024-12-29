import {Component, OnInit} from '@angular/core';
import {AgGridAngular, AgGridModule} from "ag-grid-angular";
import {ClientSideRowModelModule, ColDef} from "ag-grid-community";
import {TransactionsService} from "../transactions.service";
import {Transaction} from "sequelize";

/*
 * This Angular component integrates the ag-Grid table to display transaction data.
 * It loads transaction details such as ID, amount, type, category, date, description, payment method, and tags.
 */

@Component({
  selector: 'app-ag-grid',
  imports: [
    AgGridAngular,
  ],
  templateUrl: './ag-grid.component.html',
  standalone: true,
  styles: ``
})
export class AgGridComponent implements OnInit {

  columnDefs: ColDef[] = [
    { headerName: 'Transaction ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Amount ($)', field: 'amount', sortable: true, filter: true },
    {
      headerName: 'Type',
      field: 'isExpense',
      sortable: true,
      filter: true,
      valueGetter: (params) => (params.data.isExpense ? 'Expense' : 'Income'),
    },
    { headerName: 'Category', field: 'category', sortable: true, filter: true },
    {
      headerName: 'Date',
      field: 'date',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Payment Method', field: 'paymentMethod', sortable: true, filter: true },
    { headerName: 'Tags', field: 'tags', sortable: false, filter: false },
  ];

  rowData: any[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  // Loads the transaction data from the TransactionsService and assigns it to rowData
  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe((data) => {
      console.log('Transactions Data:', data);
      this.rowData = data;
    });
  }
  // Makes the ClientSideRowModelModule accessible within the component
  protected readonly ClientSideRowModelModule = ClientSideRowModelModule;
}
