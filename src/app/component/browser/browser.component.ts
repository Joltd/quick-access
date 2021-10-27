import {Component, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Entry} from "../../model/entry";

@Component({
  selector: 'browser',
  templateUrl: 'browser.component.html',
  styleUrls: ['browser.component.scss']
})
export class BrowserComponent implements OnInit {

  entries: Entry[] = []

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.load()
  }

  private load() {
    this.dataService.list()
      .subscribe(result => this.entries = result)
  }

}
