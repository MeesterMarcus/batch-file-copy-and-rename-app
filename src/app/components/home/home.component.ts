import {Component, NgZone, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  adZones: string;

  constructor(private _electronService: ElectronService, private _ngZone: NgZone) {

  }

  ngOnInit() {
  }

  selectFile() {
    console.log('selecting file');
    this._electronService.ipcRenderer.send('duplicate-file', this.adZones);
  }

}
