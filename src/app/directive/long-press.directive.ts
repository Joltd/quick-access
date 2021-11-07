import {Directive, EventEmitter, HostListener, Output} from "@angular/core";

@Directive({
  selector: '[long-press]'
})
export class LongPressDirective {

  private static TIMEOUT: number = 600

  private timerId!: number
  private pressInProcess: boolean = false

  @Output()
  longPress: EventEmitter<void> = new EventEmitter<void>()

  @HostListener('pointerdown')
  onPointerDown() {
    this.pressInProcess = true
    this.timerId = setTimeout(() => {
      if (this.pressInProcess && this.longPress) {
        this.longPress.emit()
      }
    }, LongPressDirective.TIMEOUT)
  }

  @HostListener('pointerup', ['$event'])
  onPointerUp(event: PointerEvent) {
    if (this.pressInProcess) {
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
