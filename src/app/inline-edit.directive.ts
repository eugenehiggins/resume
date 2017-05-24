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
    // this.renderer.removeAttribute(this.nativeElement, 'readonly')
    this.renderer.removeClass(this.nativeElement, 'form-control-static')
  }

  @HostListener('blur', ['$event']) onBlur(event){
    // console.log(event.target)
    this.renderer.addClass(this.nativeElement, 'form-control-static')
  }
}
