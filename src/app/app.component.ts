import {Component, HostListener} from '@angular/core';
import {Event} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    return false
  }

}
