import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GpoParlamentarioComponent} from "./gpo-parlamentario.component";
import {RouterModule, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {LayoutModule} from "../../../layout/layout.module";
import {TranslateModule} from "@ngx-translate/core";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {FuseConfirmDialogModule, FuseSidebarModule} from "../../../../@fuse/components";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatRippleModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import { GpoParlamentarioFormComponent } from './gpo-parlamentario-form/gpo-parlamentario-form.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Paginator } from '../../../providers/paginator';
import { MatPaginatorModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import {MatListModule} from "@angular/material/list";

const routes: Routes = [
  {
    path: '',
        component: GpoParlamentarioComponent
  }
];

@NgModule({
  declarations: [
    GpoParlamentarioComponent,
    GpoParlamentarioFormComponent
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
    MatSnackBarModule,
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    LayoutModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSelectModule,
    MatListModule
  ],
  entryComponents: [
    GpoParlamentarioFormComponent
    ],
    providers: [{
        provide: MatPaginatorIntl,
        useClass: Paginator
    }],
})
export class GpoParlamentarioModule {
}
