import {Component, Inject, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Entry} from "../../model/entry";

@Component({
  selector: 'editor',
  templateUrl: 'editor.component.html',
  styleUrls: ['editor.component.scss']
})
export class EditorComponent implements OnInit {

  private id: number
  entry!: Entry

  constructor(
    private dialog: MatDialogRef<EditorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {id: number},
    private dataService: DataService
  ) {
    this.id = data.id
  }

  ngOnInit(): void {
    this.dataService.byId(this.id)
      .subscribe(result => this.entry = result)
  }

  ok() {
    this.dataService.update(this.entry)
      .subscribe(() => this.dialog.close(true))
  }

  cancel() {
    this.dialog.close()
  }

}
