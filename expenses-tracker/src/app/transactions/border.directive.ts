import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

/*
 * This Angular directive adds a border to an element when the mouse hovers over it
 * and removes the border when the mouse leaves.
 */

@Directive({
  standalone: true,
  selector: '[appBorder]'
})
export class BorderDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // add a border when we pass the mouse in the table
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid blue');
  }

  // remove the border
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'border');
  }
}
