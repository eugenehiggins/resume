import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[autoWidth]'
})
export class AutoWidthDirective {
  @Input() theValue: string;

  private nativeElement: Node;

  constructor(private renderer: Renderer2, private element: ElementRef) {
    this.nativeElement = element.nativeElement;

  }

  @HostListener('keyup') onKey() {

    switch (this.nativeElement.nodeName) {
      case "INPUT": {
        console.log(this.nativeElement.nodeName, (<HTMLInputElement>this.nativeElement).width)
        break;
      }
      case "TEXTAREA": {
        const scrollHeight = (<HTMLTextAreaElement>this.nativeElement).scrollHeight;
        this.renderer.setStyle(this.nativeElement, 'height', scrollHeight + 'px')
        break;
      }
    }

    // this.renderer.removeClass(this.nativeElement, 'form-control-static')
  }

  @HostListener('blur') onBlur() {
    this.renderer.addClass(this.nativeElement, 'form-control-static')
  }
}
