import {Component, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Entry} from "../../model/entry";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {animate, AnimationBuilder, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'viewer',
  templateUrl: 'viewer.component.html',
  styleUrls: ['viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  prod: boolean = environment.production

  entries: Entry[] = []
  private id!: number
  pointer: number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animationBuilder: AnimationBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.isFirstStart()
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/intro']).then()
        } else {
          this.route.params.subscribe(params => {
            this.id = +params['id']
            this.load()
          })
        }
      })
  }

  private load() {
    this.dataService.list()
      .subscribe(entries => {
        this.entries = entries
        if (this.entries.length == 0) {
          this.router.navigate(['/browser']).then()
        } else if (this.id) {
          this.pointer = this.entries.findIndex(entry => entry.id == this.id)
        } else {
          this.pointer = this.entries.findIndex(entry => entry.favorite)
        }
      })
  }

  debugImageSrc(index: number): string {
    if (index == 0) {
      return '/quick-access/assets/id-card.png'
    } else {
      return '/quick-access/assets/qr-code.png'
    }
  }

}
