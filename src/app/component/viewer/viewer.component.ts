import {Component, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Entry} from "../../model/entry";
import {ActivatedRoute, Router} from "@angular/router";
import {EditorComponent} from "../editor/editor.component";

@Component({
  selector: 'viewer',
  templateUrl: 'viewer.component.html',
  styleUrls: ['viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  private id!: number
  entry: Entry = new Entry()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']
      this.load()
    })
  }

  private load() {
    if (this.id) {
      this.loadById()
    } else {
      this.loadFavorite()
    }
  }

  private loadFavorite() {
    this.dataService.favorite()
      .subscribe(result => {
        if (result) {
          this.id = result.id
          this.setupEntry(result)
        } else {
          this.router.navigate(['/browser']).then()
        }
      })
  }

  private loadById() {
    this.dataService.byId(this.id)
      .subscribe(result => this.setupEntry(result))
  }

  private setupEntry(entry: Entry) {
    this.entry = entry
  }

}
