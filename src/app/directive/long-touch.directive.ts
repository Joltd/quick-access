import {Directive, EventEmitter, HostListener, Output} from "@angular/core";

@Directive({
  selector: '[long-touch]'
})
export class LongTouchDirective {

  private static TIMEOUT: number = 600

  private timerId!: number
  private pressInProcess: boolean = false

  @Output()
  longClick: EventEmitter<void> = new EventEmitter<void>()

  @HostListener('pointerdown')
  onPointerDown() {
    this.pressInProcess = true
    this.timerId = setTimeout(() => {
      if (this.pressInProcess) {
        if (this.longClick) {
          this.longClick.emit()
        }
      }
    }, LongTouchDirective.TIMEOUT)
  }

  @HostListener('pointerup', ['$event'])
  onPointerUp(event: PointerEvent) {
    if (this.pressInProcess) {
      console.log('prevent')
      event.preventDefault()
    }
    this.pressInProcess = false
    clearTimeout(this.timerId)
  }

  @HostListener('pointermove')
  onPointerMove() {
    this.pressInProcess = false
    clearTimeout(this.timerId)
  }

}
