import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserComponent} from "./component/browser/browser.component";
import {ViewerComponent} from "./component/viewer/viewer.component";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DataService} from "./service/data.service";
import {EditorComponent} from "./component/editor/editor.component";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {LongTouchDirective} from "./directive/long-touch.directive";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PinchZoomDirective} from "./directive/pinch-zoom.directive";

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    ViewerComponent,
    EditorComponent,
    LongTouchDirective,
    PinchZoomDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('quick-access-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
