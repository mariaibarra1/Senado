import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComisionesComponent } from './comisiones.component';
import { ComisionesFormComponent } from './comisiones-form/comisiones-form.component';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '../../../layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../../@fuse/components';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Paginator } from '../../../providers/paginator';
import { MatPaginatorIntl } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { ComisionesUsuarioFormComponent } from './comisiones-usuario-form/comisiones-usuario-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
  {
    path: '',
    component: ComisionesComponent
  }
];


@NgModule({
  declarations: [ComisionesComponent, ComisionesFormComponent, ComisionesUsuarioFormComponent],
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
    FuseSharedModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    LayoutModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    ComisionesFormComponent,
    ComisionesUsuarioFormComponent
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: Paginator
  }],
})
export class ComisionesModule { }
