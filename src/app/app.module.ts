import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent, UpdatesAvailableDialog} from './app.component';
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
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ScannerComponent} from "./component/scanner/scanner.component";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {
  MatSlideContainerComponent,
  MatSlideDirective
} from "./component/mat-slide-container/mat-slide-container.component";
import {IntroComponent} from "./component/intro/intro.component";
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import {TestComponent} from "./component/test/test.component";
import {LongPressDirective} from "./directive/long-press.directive";

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    ViewerComponent,
    EditorComponent,
    ScannerComponent,
    MatSlideContainerComponent,
    MatSlideDirective,
    IntroComponent,
    UpdatesAvailableDialog,
    TestComponent,
    LongPressDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('quick-access-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HammerModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ZXingScannerModule,
    NgxQRCodeModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
