import {Component} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'intro',
  templateUrl: 'intro.component.html',
  styleUrls: ['intro.component.scss']
})
export class IntroComponent {

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  gotIt() {
    this.dataService.skipIntro()
      .subscribe(() => this.router.navigate(['/viewer']).then())
  }

}
