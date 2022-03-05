import {NgModule} from '@angular/core';
import { CommonModule, registerLocaleData} from '@angular/common';
import {SolicitudesComponent} from './solicitudes.component';
import {RouterModule, Routes} from "@angular/router";
import {CalendarioComponent} from "../calendario/calendario.component";
import {FuseSidebarModule} from "../../../../@fuse/components";
import {MatIconModule} from "@angular/material/icon";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Paginator } from '../../../providers/paginator';


import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FuseConfirmDialogModule } from "../../../../@fuse/components";
import { ColorPickerModule } from "ngx-color-picker";
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeEsMx from '@angular/common/locales/es-MX';
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatAutocompleteModule } from "@angular/material/autocomplete";



const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent
  }
];

registerLocaleData(localeEsMx);

@NgModule({
  declarations: [
    SolicitudesComponent,
    SolicitudFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatBadgeModule,
    MatChipsModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule,

    FuseSidebarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,

    FuseSharedModule,
    FuseConfirmDialogModule
  ],
  entryComponents: [
    SolicitudFormComponent
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: Paginator
  }],
})
export class SolicitudesModule {
}
