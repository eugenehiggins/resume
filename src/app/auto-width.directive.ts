import {
  AfterViewInit, Directive, ElementRef, HostListener, Renderer2
} from '@angular/core';

@Directive({
  selector: '[autoWidth]'
})
export class AutoWidthDirective implements AfterViewInit{


  constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  ngAfterViewInit(){
  }

  resizeElement(el: ElementRef){
    let fontSize: number = parseFloat(window.getComputedStyle(this.el.nativeElement).getPropertyValue('font-size'));
    switch (this.el.nativeElement.nodeName) {
      case "INPUT": {
        // console.log(this.el.nativeElement.nodeName, (<HTMLInputElement>this.el.nativeElement).clientWidth)
        console.log()
        let contentLength = this.el.nativeElement.value.length;
        this.renderer.setStyle(this.el.nativeElement, 'width', (contentLength*(fontSize/2)) + 'px')
        this.renderer.setStyle(this.el.nativeElement, 'padding', '0')
        break;
      }
      case "TEXTAREA": {
        const scrollHeight = (<HTMLTextAreaElement>this.el.nativeElement).scrollHeight;
        console.log(scrollHeight)
        this.renderer.setStyle(this.el.nativeElement, 'height', scrollHeight + 'px')
        break;
      }
    }
  }

  @HostListener('keyup') onKey() {
    this.resizeElement(this.el)
    // switch (this.el.nativeElement.nodeName) {
    //   case "INPUT": {
    //     // console.log(this.el.nativeElement.nodeName, (<HTMLInputElement>this.el.nativeElement).clientWidth)
    //     let contentLength = this.el.nativeElement.value.length;
    //     this.renderer.setStyle(this.el.nativeElement, 'width', (contentLength*15) + 'px')
    //     this.renderer.setStyle(this.el.nativeElement, 'padding', '0')
    //     break;
    //   }
    //   case "TEXTAREA": {
    //     const scrollHeight = (<HTMLTextAreaElement>this.el.nativeElement).scrollHeight;
    //     console.log(scrollHeight)
    //     this.renderer.setStyle(this.el.nativeElement, 'height', scrollHeight + 'px')
    //     break;
    //   }
    // }

    // this.renderer.removeClass(this.el.nativeElement, 'form-control-static')
  }



  @HostListener('change') onChange() {
    console.log('change')
  }

  @HostListener('blur') onBlur() {
    this.renderer.addClass(this.el.nativeElement, 'form-control-static')
  }
}
