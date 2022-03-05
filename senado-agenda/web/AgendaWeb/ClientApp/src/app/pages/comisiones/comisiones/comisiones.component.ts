import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComisionesFormComponent } from './comisiones-form/comisiones-form.component';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ComisionesService } from '../../../services/comisiones.service';
import { Config } from 'protractor';
import { ComisionModel } from '../../../models/comision.model';
import { Observable } from 'rxjs';
import { ComisionesUsuarioFormComponent } from './comisiones-usuario-form/comisiones-usuario-form.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit {
  //#region variables
  ListaComisiones: ComisionModel[];
  displayedColumns: string[] = ['nombre','nombreUbicacion', 'nombreLegislatura','nombreTipo','opciones'];
  //dataSource = this.ListaComisiones;
  dataSource = new MatTableDataSource<ComisionModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  dialogo: any;
  progressBar = true;
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';
  //#endregion
  constructor(
    private _matdialog: MatDialog,
    private _snackBar: MatSnackBar,
    private coms: ComisionesService,
    private changeD: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    await this.showAllCom();
  }
  //#region form
  agregarCom(): void {
    this.dialogo = this._matdialog.open(ComisionesFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta', 5000);
        this.progressBar = true;
        await this.showAllCom();
      } else if (response == 'error') {
        this.mostrarMensaje('Ocurrió un error',5000);
      }
      if (!response) {
        return;
      }
    });
  }

  modificarCom(element: ComisionModel): void {
    this.dialogo = this._matdialog.open(ComisionesFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta', 5000);
        this.progressBar = true;
        await this.showAllCom();
      } else if (response == 'error') {
        this.mostrarMensaje('Ocurrió un error',5000);
      }

      if (!response) {
        return;
      }
    });
  }

  mostrarMensaje(mensaje: string, time: number) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: time,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical
    });
  }
  //#endregion
  //#region usuarios_asociados
  adminUsr(element: ComisionModel): void{
    this.dialogo = this._matdialog.open(ComisionesUsuarioFormComponent, {
      panelClass: 'form-dialog',
      data: {
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta', 5000);
        //await this.showAllCom();
      } else if (response == 'error') {
        this.mostrarMensaje('Ocurrió un error', 5000);
      }
      if (!response) {
        return;
      }
    });
  }
  //#endregion
  //#region service
  async showAllCom() {
    await this.coms.Httpget('/comisiones/comision').subscribe(data => {
      this.ListaComisiones = data as ComisionModel[];
      this.dataSource.data = this.ListaComisiones;
      this.dataSource.paginator = this.paginator;
      this.changeD.detectChanges();
      this.progressBar = false;
    }, error => {
        this.mostrarMensaje('Ocurrió un error al obtener la información', 5000);
    });
  }

  async deshabilitar(id: number) {
    let model: ComisionModel;
    model = new ComisionModel({});
    model.id = id;
    this.coms.HttpDelete(model, '/comisiones/comision/' + id).subscribe(async data => {
      this.mostrarMensaje('Deshabilitado correctamente', 5000);
      this.progressBar = true;
      await this.showAllCom();
    }, error => {
        this.mostrarMensaje('Ocurrió un error al deshabilitar el registro',5000);
      });

  }

  async habilitar(element: ComisionModel) {
    let model: ComisionModel;
    model = new ComisionModel({});
    model.id = element.id;
    model.activo = true;
    model.correo_electronico = null;
    model.nombre = null;
    model.id_ubicacion = null;
    model.micrositio = null;
    model.nombreUbicacion = null;
    model.id_legislatura = null;
    model.id_tipo_comision = null;
    this.coms.HttpPut(model, '/comisiones/comision/' + model.id).subscribe(async data => {
      this.mostrarMensaje('Habilitado correctamente', 5000);
      this.progressBar = true;
      await this.showAllCom();
    }, error => {
        this.mostrarMensaje('Ocurrió un error al habilitar el registro', 5000);
      });

  }
  //#endregion
}
