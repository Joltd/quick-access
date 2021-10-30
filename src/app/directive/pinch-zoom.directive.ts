import {AfterViewInit, ContentChild, Directive, ElementRef, HostListener} from "@angular/core";
import {environment} from "../../environments/environment";

@Directive({
  selector: '[pinch-zoom]'
})
export class PinchZoomDirective {

  private static DOUBLE_UP_THRESHOLD: number = 300

  private prod: boolean = environment.production

  private first: PointerEvent | null = null
  private second: PointerEvent | null = null

  private originWidth: number = 0
  private originHeight: number = 0

  private width: number = 0
  private height: number = 0

  private parentWidth: number = 0
  private parentHeight: number = 0

  private lastUp: number = 0;

  constructor(private element: ElementRef) {}

  @HostListener('load')
  onLoad() {
    if (!this.parentWidth && !this.parentHeight) {
      this.parentWidth = this.element.nativeElement.parentNode.offsetWidth
      this.parentHeight = this.element.nativeElement.parentNode.offsetHeight
    }
    this.reset()
    if (!this.originWidth && !this.originHeight) {
      this.originWidth = this.element.nativeElement.width
      this.originHeight = this.element.nativeElement.height
    }
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {
    this.first = event
    if (!this.prod || (!this.width && !this.height)) {
      this.width = this.element.nativeElement.width
      this.height = this.element.nativeElement.height
    }
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    let isPinch = (this.prod && this.first?.pointerId != event.pointerId)
      || (!this.prod && this.first?.pointerId == event.pointerId && event.shiftKey)
    if (!this.first || !isPinch) {
      this.first = null
      this.second = null
      return
    }

    this.second = event

    let distance = Math.sqrt(
      Math.pow(this.first.clientX - this.second.clientX, 2)
      + Math.pow(this.first.clientY - this.second.clientY, 2)
    )
    let zoom = distance / 100 + 1

    let newWith = this.width * zoom
    let newHeight = this.height * zoom



    // if (newWith > this.originWidth) {
    //   this.element.nativeElement.parentNode.scrollLeft = 0
    // }
    //
    // if (newHeight > this.originHeight) {
    //   this.element.nativeElement.parentNode.scrollTop = 0
    // }

    this.element.nativeElement.style.width = newWith + 'px'
    this.element.nativeElement.style.height = newHeight + 'px'

  }

  @HostListener('touchend')
  onTouchEnd() {
    let lastUp = new Date().getTime()

    if (lastUp - this.lastUp < PinchZoomDirective.DOUBLE_UP_THRESHOLD) {
      this.reset()
    }

    this.lastUp = lastUp

    this.first = null
    this.second = null
  }

  private reset() {
    this.element.nativeElement.style.width = ''
    this.element.nativeElement.style.height = this.parentHeight + 'px'

    if (this.element.nativeElement.width > this.parentWidth) {
      this.element.nativeElement.style.width = this.parentWidth + 'px'
      this.element.nativeElement.style.height = ''
    }
  }

}
