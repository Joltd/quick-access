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

  @HostListener('mousedown')
  @HostListener('touchstart')
  onPressStart() {
    this.pressInProcess = true
    this.timerId = setTimeout(() => {
      if (this.pressInProcess) {
        if (this.longClick) {
          this.longClick.emit()
        }
      }
    }, LongTouchDirective.TIMEOUT)
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  @HostListener('mousemove')
  reset() {
    this.pressInProcess = false
    clearTimeout(this.timerId)
  }

}
