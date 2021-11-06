import {ApplicationRef, Component, HostListener, Inject} from '@angular/core';
import {Event} from "@angular/router";
import {SwUpdate, UpdateAvailableEvent} from "@angular/service-worker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private update: SwUpdate,
    private dialog: MatDialog,
    private translocoService: TranslocoService
  ) {
    this.translocoService.setActiveLang(navigator.language.substr(0,2))
    this.update.available.subscribe((event: UpdateAvailableEvent) => {
      console.log(`New version ${event.available.hash}`)
      this.dialog.open(UpdatesAvailableDialog)
        .afterClosed()
        .subscribe(result => {
          if (result) {
            this.update.activateUpdate().then(() => document.location.reload())
          }
        })
    })
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    return false
  }

}

@Component({
  selector: 'updates-available',
  template: `
    <div mat-dialog-content>
      <p>New version available</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Update</button>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
    </div>`
})
export class UpdatesAvailableDialog {}
