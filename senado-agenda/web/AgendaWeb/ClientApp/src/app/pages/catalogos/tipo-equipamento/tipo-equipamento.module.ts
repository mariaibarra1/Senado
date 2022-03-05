import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoEquipamentoComponent } from "./tipo-equipamento.component";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LayoutModule } from "../../../layout/layout.module";
import { TranslateModule } from "@ngx-translate/core";
import { FuseSharedModule } from "../../../../@fuse/shared.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "../../../../@fuse/components";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TipoEquipamentoFormComponent } from "./tipo-equipamento-form/tipo-equipamento-form.component";
import { MatSnackBarModule, MatDialogModule, MatSelectModule, MatTooltipModule, MatProgressBarModule } from '@angular/material';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Paginator } from '../../../providers/paginator';
import { MatPaginatorModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: TipoEquipamentoComponent
  }
];

@NgModule({
  declarations: [
    TipoEquipamentoComponent,
    TipoEquipamentoFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressBarModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    LayoutModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  entryComponents: [
    TipoEquipamentoFormComponent
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: Paginator
  }],
})

export class TipoEquipamentoModule {}
