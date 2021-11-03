import {Component, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Entry} from "../../model/entry";
import {timeout} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {EditorComponent} from "../editor/editor.component";
import {Router} from "@angular/router";

@Component({
  selector: 'browser',
  templateUrl: 'browser.component.html',
  styleUrls: ['browser.component.scss']
})
export class BrowserComponent implements OnInit {

  entries: Entry[] = []
  editMode: boolean = false
  entry!: Entry | null
  showButtons: boolean = false

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.load()
  }

  private load() {
    this.dataService.list()
      .subscribe(result => this.entries = result)
  }

  onFileSelected(event: Event) {
    let input = event.target as HTMLInputElement
    if (!input.files) {
      return
    }
    let file = input.files[0]
    input.value = ''
    this.dataService.createByFile(file)
      .subscribe(() => {
        this.showButtons = false
        this.load()
      })
  }

  enterEditMode(event: any, entry: Entry) {
    if (event.deltaTime < 500 || this.editMode) {
      return
    }
    this.editMode = true
    this.entry = entry
  }

  exitEditMode() {
    this.editMode = false
    this.entry = null
  }

  edit() {
    if (!this.entry) {
      return
    }
    this.dialog.open(EditorComponent, {data: {id: this.entry.id}})
      .afterClosed()
      .subscribe(result => {
        this.exitEditMode()
        if (result) {
          this.load()
        }
      })
  }

  remove() {
    if (!this.entry) {
      return
    }
    this.dataService.remove(this.entry.id)
      .subscribe(() => {
        this.exitEditMode()
        this.load()
      })
  }

  scan() {
    this.router.navigate(['/scanner']).then()
  }

}
