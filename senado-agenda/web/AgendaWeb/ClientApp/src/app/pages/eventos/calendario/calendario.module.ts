import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CalendarioComponent} from "./calendario.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {FuseConfirmDialogModule} from "../../../../@fuse/components";
import {ColorPickerModule} from "ngx-color-picker";
import {CalendarModule as AngularCalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CalendarioFormComponent} from './calendario-form/calendario-form.component';
import {CalendarService} from "./calendar.service";
import localeEsMx from '@angular/common/locales/es-MX';
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

const routes: Routes = [
  {
    path: '',
    component: CalendarioComponent
  }
];

registerLocaleData(localeEsMx);

@NgModule({
  declarations: [
    CalendarioComponent,
    CalendarioFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatBadgeModule,
    MatChipsModule,
    MatAutocompleteModule,

    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,

    FuseSharedModule,
    FuseConfirmDialogModule
  ],
  providers: [
    CalendarService
  ],
  entryComponents: [
    CalendarioFormComponent
  ]
})
export class CalendarioModule {
}
