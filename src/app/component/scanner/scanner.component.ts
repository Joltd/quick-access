import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'scanner',
  templateUrl: 'scanner.component.html',
  styleUrls: ['scanner.component.scss']
})
export class ScannerComponent {

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  onScan(event: string) {
    this.dataService.createByQr(event)
      .subscribe(id => {
        this.router.navigate(['/viewer', id]).then()
      })
  }

}
