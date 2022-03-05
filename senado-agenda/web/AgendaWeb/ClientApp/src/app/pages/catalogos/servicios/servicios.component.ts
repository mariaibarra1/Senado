import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ServiciosFormComponent } from "./servicios-form/servicios-form.component";
import { FormGroup } from "@angular/forms";
import { modelServicios } from '../../../models/modelServicios'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { CatalogosService } from '../../../services/catalogos.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-servicios',
    templateUrl: './servicios.component.html',
    styleUrls: ['./servicios.component.scss']
})


export class ServiciosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource<modelServicios>();
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  servicios: modelServicios;
  dialogo: any;
  progressBar = true;
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cs: CatalogosService) { }

  ngOnInit() {
    this.showAllServicios();
  }

  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical
    });
  }

  agregarServicio(): void {

    this.dialogo = this._matDialog.open(ServiciosFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });

    this.dialogo.afterClosed().subscribe((response: FormGroup) => {

      if (!response) {
        return;
      }

    });
  }
  async showAllServicios() {
    await this.cs.Httpget('/catalogos/servicios')
      .subscribe((tempdate) => {
        this.dataSource.data = tempdate as modelServicios[];
        this.progressBar = false;
        this.dataSource.paginator = this.paginator;
        this.changePage();

      });
  }
  modificar(element: modelServicios): void {

    this.dialogo = this._matDialog.open(ServiciosFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
      await this.showAllServicios();
      if (!response) {
        return;
      }
    });
  }
  async deshabilitar(id: number) {
    let model: modelServicios;
    model = new modelServicios({});
    model.id = id;
    this.cs.HttpDelete(model, '/catalogos/servicios/' + id).subscribe(data => {
    });
    this.mostrarMensaje('Deshabilitado correctamente');
    this.showAllServicios();
  }
  async habilitar(element: modelServicios) {
    let model: modelServicios;
    model = new modelServicios({});
    model.id = element.id;
    model.nombre = null;
    model.descripcion = null;
    model.activo = true;
    this.cs.HttpPut(model, '/catalogos/servicios/' + model.id).subscribe(data => {
    });
    this.mostrarMensaje('Habilitado correctamente');
    this.showAllServicios();
  }

  changePage() {

    setTimeout(function () {

    }, 200);

  }



}
