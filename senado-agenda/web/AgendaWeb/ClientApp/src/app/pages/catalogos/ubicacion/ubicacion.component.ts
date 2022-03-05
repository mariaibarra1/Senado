import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UbicacionFormComponent} from "./ubicacion-form/ubicacion-form.component";
import {FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {CatalogosService} from '../../../services/catalogos.service';
import {UbicacionModel} from '../../../models/ubicacion.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {

  public ListUbicacion: UbicacionModel[];

  /*
  *
  * La columna opciones es para los íconos de editar y eliminar
  *
  * */
  displayedColumns: string[] = ['nombre', 'calle', 'estado', 'municipio', 'localidad', 'opciones'];
  dataSource = new MatTableDataSource<UbicacionModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dialogo: any;
  EnvioPost = false;

  /*
  *
  * SnackBar - Presentación de mensajes de éxito y error
  *
  * */
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private catalogosService: CatalogosService,
  ) {
  }

  ngOnInit() {
    this.getUbicacion();
  }

  getUbicacion() {
    this.EnvioPost = true;
    this.catalogosService.Httpget("/catalogos/Ubicacion").subscribe(async (tempdate) => {
      if (tempdate.length > 0) {
        this.dataSource.data = tempdate as UbicacionModel[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changePage();
        await this.delay(2000);
        this.EnvioPost = false;
      } else {
        this.dataSource.data = tempdate as UbicacionModel[];
        await this.delay(2000);
        this.EnvioPost = false;
        this.mostrarMensaje("No existen elementos registrados");
      }
    }, async err => {
      this.mostrarMensaje("Ocurrió un error al obtener la información");
    });

  }

  agregarUbicacion(): void {
    this.dialogo = this._matDialog.open(UbicacionFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (!response) {
        return;
      }
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        this.getUbicacion();
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
    });
  }


  modificarUbicacion(element: UbicacionModel): void {
    console.log(element);
    this.dialogo = this._matDialog.open(UbicacionFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (!response) {
        return;
      }
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.getUbicacion();
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
    });
  }

  async habilitardeshabilitar(id: number, tipo: string) {
    let model: UbicacionModel;
    model = new UbicacionModel();
    model.id = id;
    this.catalogosService.HttpDelete(model, '/catalogos/Ubicacion/' + id).subscribe(async data => {
      await this.getUbicacion();
      if (tipo === 'desactivar') {
        this.mostrarMensaje('Deshabilitado correctamente');
      } else {
        this.mostrarMensaje('Habilitado correctamente');
      }
    }, async err => {
      this.mostrarMensaje("Ocurrió un error al realizar la acción");
    });


  }


  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical,
    });
  }

  changePage() {
    setTimeout(function () {
    }, 200);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  filtrar(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();
    }
  }
}
