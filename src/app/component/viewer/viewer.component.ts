import {Component, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Entry} from "../../model/entry";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {animate, AnimationBuilder, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'viewer',
  templateUrl: 'viewer.component.html',
  styleUrls: ['viewer.component.scss'],
  animations: [
    trigger(
      'slided',
      [
        transition(
          '* => true',
          [animate('10ms', style({left: '{{offset}}%'}))]
        )
      ]
    )
  ]
})
export class ViewerComponent implements OnInit {

  prod: boolean = environment.production

  entries: Entry[] = []
  private id!: number
  pointer: number = 0
  private offset: number = 0
  slided: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animationBuilder: AnimationBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']
      this.load()
    })
  }

  private load() {
    this.dataService.list()
      .subscribe(entries => {
        this.entries = entries
        if (this.entries.length == 0) {
          this.router.navigate(['/browser']).then()
        } else {
          this.pointer = this.entries.findIndex(entry => entry.id == this.id)
        }
      })
  }

  slidePanOffset(index: number): number {
    return (index - this.pointer) * 100 + this.offset
  }

  slideOffset(index: number): number {
    return (index - this.pointer) * 100
  }

  onPan(event: any) {
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

    if (event.offsetDirection == 2 && this.pointer < this.entries.length - 1) { // left
      this.pointer++
      this.offset = this.offset + 100
    } else if (event.offsetDirection == 4 && this.pointer > 0) { // right
      this.pointer--
      this.offset = this.offset - 100
    } else {
    }
    this.slided = true
  }

  onSlidedDone() {
    this.slided = false
    this.offset = 0
  }

  debugImageSrc(index: number): string {
    if (index == 0) {
      return '/quick-access/assets/page-2.png'
    } else {
      return '/quick-access/assets/qr-code.png'
    }
  }

}
