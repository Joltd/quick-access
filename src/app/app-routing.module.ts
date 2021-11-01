import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserComponent} from "./component/browser/browser.component";
import {ViewerComponent} from "./component/viewer/viewer.component";
import {ScannerComponent} from "./component/scanner/scanner.component";

const routes: Routes = [
  { path: 'browser', component: BrowserComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: 'viewer/:id', component: ViewerComponent },
  { path: 'scanner', component: ScannerComponent },
  { path: '', redirectTo: '/browser', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
