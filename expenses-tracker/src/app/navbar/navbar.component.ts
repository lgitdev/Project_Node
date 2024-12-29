import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

/* * This Angular component defines a standalone navigation bar element.
 * It includes a method to navigate to the transactions page with specific filters
 * Its structure is specified in the HTML file */

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styles: ``
})
export class NavbarComponent {

  constructor(private router: Router) {
  }

  navigateToTransactions(filters: { showIncome: boolean; showExpense: boolean }) {
    this.router.navigate(['/transactions'], {
      queryParams: filters,
    });
  }
}
