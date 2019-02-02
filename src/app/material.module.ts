import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule
  ],
})
export class MyOwnCustomMaterialModule { }
