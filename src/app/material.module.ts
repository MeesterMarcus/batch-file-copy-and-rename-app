import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
})
export class MyOwnCustomMaterialModule { }
