import {Component, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Entry} from "../../model/entry";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
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
          // redirect to browser
        }
      })
  }

  private loadById() {
    this.dataService.byId(this.id)
      .subscribe(result => this.setupEntry(result))
  }

  private setupEntry(entry: Entry) {
    this.entry = entry
    this.loadContent()
  }

  private loadContent() {

  }

  toBrowser() {
    // redirect to browser
  }

  edit() {
    this.dialog.open(EditorComponent, {data: {id: this.id}})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.loadById()
        }
      })
  }

  remove() {
    this.dataService.remove(this.id)
      .subscribe(() => this.loadFavorite())
  }

}
