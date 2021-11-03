import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserComponent} from "./component/browser/browser.component";
import {ViewerComponent} from "./component/viewer/viewer.component";
import {ScannerComponent} from "./component/scanner/scanner.component";
import {IntroComponent} from "./component/intro/intro.component";

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'browser', component: BrowserComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: 'viewer/:id', component: ViewerComponent },
  { path: 'scanner', component: ScannerComponent },
  { path: '', redirectTo: '/viewer', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
