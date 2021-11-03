import {
  AfterViewInit,
  Component,
  ContentChildren, Directive, ElementRef, HostBinding, Input
} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ThemePalette} from "@angular/material/core/common-behaviors/color";

@Directive({selector: '[mat-slide]',})
export class MatSlideDirective {}

@Component({
  selector: 'mat-slide-container',
  templateUrl: 'mat-slide-container.component.html',
  styleUrls: ['mat-slide-container.component.scss'],
  animations: [
    trigger(
      'slided',
      [
        transition(
          '* => true',
          [animate('100ms', style({left: '{{offset}}%'}))]
        )
      ]
    ),
    trigger(
      'pointed',
      [
        state('true', style({width: '1rem'})),
        state('false', style({width: '0.5rem'})),
        transition(
          'false => true', [animate('100ms')]
        ),
        transition(
          'true => false', [animate('100ms')]
        )
      ]
    )
  ]
})
export class MatSlideContainerComponent {

  @Input()
  color: ThemePalette = undefined

  @Input()
  pointer: number = 0
  offset: number = 0
  slided: boolean = false

  @ContentChildren(MatSlideDirective)
  sliders: MatSlideDirective[] = []

  slidePanOffset(): number {
    return -this.pointer * 100 + this.offset
  }

  slideOffset(): number {
    return -this.pointer * 100
  }

  onSlidedDone() {
    this.slided = false
    this.offset = 0
  }

  onPanMove(event: any) {
    let offsetPercent = event.distance / window.innerWidth * 100
    if (event.offsetDirection == 2) { // left
      this.offset = -offsetPercent
    } else if (event.offsetDirection == 4) { // right
      this.offset = offsetPercent
    }
  }

  onPanEnd(event: any) {
    if (Math.abs(this.offset) < 15) {
      this.slided = true
      return
    }

    if (event.offsetDirection == 2 && this.pointer < this.sliders.length - 1) { // left
      this.pointer++
      this.offset = this.offset + 100
    } else if (event.offsetDirection == 4 && this.pointer > 0) { // right
      this.pointer--
      this.offset = this.offset - 100
    } else {
    }
    this.slided = true
  }

}
