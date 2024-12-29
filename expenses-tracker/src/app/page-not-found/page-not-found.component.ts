import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

/*
 * This Angular component defines a standalone "Page Not Found" element.
 * It includes navigation capabilities through RouterLink
 * Its structure is specified in the HTML file
 */

@Component({
  selector: 'app-page-not-found',
  imports: [
    RouterLink
  ],
  templateUrl: './page-not-found.component.html',
  standalone: true,
  styles: ``
})
export class PageNotFoundComponent {

}
