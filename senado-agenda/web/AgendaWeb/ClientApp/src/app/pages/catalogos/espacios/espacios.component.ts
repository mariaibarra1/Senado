import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {EspaciosFormComponent} from "./espacios-form/espacios-form.component";
import {FormGroup} from "@angular/forms";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { CatalogosService } from '../../../services/catalogos.service';
import { EspacioModel } from '../../../models/espacio.model';
import { UbicacionModel } from '../../../models/ubicacion.model';
import { EquipamientoModel } from '../../../models/equipamiento.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
//import { BComponent } from '../ubicacion/ubicacion-form/ubicacion-form.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.scss']
})
export class EspaciosComponent implements OnInit {

  public ListUbicacion: UbicacionModel[];
  public ListEspacios: EspacioModel[];

  /*
  *
  * La columna opciones es para los íconos de editar y eliminar
  *
  * */
  displayedColumns: string[] = ['nombre', 'ubicacion', 'capacidad', 'opciones'];
  dataSource = new MatTableDataSource<EspacioModel>();
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //dataSource = ELEMENT_DATA;

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
    this.getEspacios();
  }


  getEspacios() {
    this.EnvioPost = true;
    this.catalogosService.Httpget("/catalogos/Espacio").subscribe(async (tempdate) => {
      if (tempdate.length > 0) {
        console.log(tempdate);
        this.dataSource.data = tempdate as EspacioModel[];
       this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changePage();
        await this.delay(2000);
        this.EnvioPost = false;
      } else {
        this.dataSource.data = tempdate as EspacioModel[];
        await this.delay(2000);
        this.EnvioPost = false;
        this.mostrarMensaje("No existen elementos registrados");
      }

    }, async err => {
        this.mostrarMensaje("Ocurrió un error al obtener la información");
      });
  }


  agregarEspacio(): void {
    this.dialogo = this._matDialog.open(EspaciosFormComponent, {
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
        this.getEspacios();
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
    });
  }


  modificarEspacio(element: EspacioModel): void {
    this.dialogo = this._matDialog.open(EspaciosFormComponent, {
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
        await this.getEspacios();
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
    });
  }

  verEspacio(element: EspacioModel): void {
    this.dialogo = this._matDialog.open(EspaciosFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'detalles',
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (!response) {
        return;
      }
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.getEspacios();
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
    });
  }

  habilitardeshabilitar(id: number, tipo: string) {
    let model: EspacioModel;
    model = new EspacioModel();
    model.id = id;
    this.catalogosService.HttpDelete(model, '/catalogos/Espacio/' + id).subscribe(async data => {
      await this.getEspacios();
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

  filtrar(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();
    }
  }

  changePage() {
    setTimeout(function () {
    }, 200);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
