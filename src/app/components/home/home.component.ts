import {Component, NgZone, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adZones: string;
  message: string;

  constructor(private _electronService: ElectronService, private _ngZone: NgZone, private snackBar: MatSnackBar) {
    this._electronService.ipcRenderer.on('duplicate-file-reply', (event, arg) => {
      this._ngZone.run(() => {
        this.message = arg;
        console.log(this.message);
        this.adZones = '';
        this.snackBar.open(this.message, 'OK', {
          duration: 2000,
        });
      });
    });
  }

  ngOnInit() {
  }

  selectFile() {
    console.log('selecting file');
    this._electronService.ipcRenderer.send('duplicate-file', this.adZones);
  }

}
