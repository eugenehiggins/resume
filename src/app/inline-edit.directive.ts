import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[inlineEdit]'
})
export class InlineEditDirective {

  private nativeElement: Node;

  constructor(private renderer: Renderer2, private element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  @HostListener('click') onClick(){
    console.log(this.element.nativeElement.value);
    this.renderer.removeAttribute(this.nativeElement, 'readonly')
  }

  @HostListener('blur') onBlur(){
    this.renderer.setAttribute(this.nativeElement, 'readonly', '')
  }
}
