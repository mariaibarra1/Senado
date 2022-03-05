import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccesoComponent} from './acceso.component';
import {RouterModule, Routes} from "@angular/router";
import {FuseSharedModule} from "../../../@fuse/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: AccesoComponent
  }
];

@NgModule({
  declarations: [
    AccesoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    FuseSharedModule
  ]
})
export class AccesoModule {
}
