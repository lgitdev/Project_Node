import { Component } from '@angular/core';
import {Router} from "@angular/router";

// This component displays a success message after a transaction is deleted
@Component({
  selector: 'app-delete-success',
  imports: [],
  template: `
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/018/914/446/small/success-text-hanging-on-a-fishing-hook-png.png" alt="Success"/>
      <h1 class="text-success mb-4">Transaction deleted successfully!</h1>
      <button class="btn btn-primary" (click)="goToDashboard()">Return to Dashboard</button>
    </div>
  `,
  standalone: true,
  styles: ``
})
export class DeleteSuccessComponent {
  constructor(private router: Router) {}

// Method to navigate back to the dashboard
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
