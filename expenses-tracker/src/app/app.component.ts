import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";

/*
 * This Angular component serves as the root component of the application.
 * It includes the Navbar and Footer components and uses RouterOutlet for routing.
 */

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: 'app.component.html',
  styles: [],
  standalone: true
})
export class AppComponent {
  title = 'expenses-tracker';
}
