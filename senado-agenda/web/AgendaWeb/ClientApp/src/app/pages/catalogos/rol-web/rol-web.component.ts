import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolWebFormComponent } from './rol-web-form/rol-web-form.component';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { RolWebModel } from '../../../models/rol-web.model';
import { CatalogosService } from '../../../services/catalogos.service';
import { PartidoPoliticoModel } from '../../../models/partido-politico.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-rol-web',
  templateUrl: './rol-web.component.html',
  styleUrls: ['./rol-web.component.scss']
})
export class RolWebComponent implements OnInit {
  //#region variables
  ListRW: RolWebModel[];
  displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource<RolWebModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dialogo: any;
  progressBar = true;
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';
  //#endregion
  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cs: CatalogosService,
    private changeD: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.showAllRW();
  }
  //#region form
  agregarRol(): void {
    this.dialogo = this._matDialog.open(RolWebFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });
    this.dialogo.afterClosed().subscribe(async(response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.showAllRW();
      } else if (response == 'error') {
        this.mostrarMensaje('Ocurrió un error');
      }

      if (!response) {
        return;
      }

    });
  }
  modificarRol(element: RolWebModel): void {
    this.dialogo = this._matDialog.open(RolWebFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async(response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.showAllRW();
      } else if (response=='error') {
        this.mostrarMensaje('Ocurrió un error');
      }

      if (!response) {
        return;
      }
    });
  }
  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical
    });
  }
  //#endregion
  //#region service
  async showAllRW() {
    await this.cs.Httpget('/catalogos/rolweb').subscribe(data => {
      this.ListRW = data as RolWebModel[];
      this.dataSource.data = this.ListRW;
      this.changeD.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.progressBar = false;
    }, error => {
        this.mostrarMensaje('Ocurrió un error al obtener los datos');
    });
  }
  async show1RW(id: number) {
    let pp1: RolWebModel[];
    let model: RolWebModel;
    model = new RolWebModel({});
    model.nombre = null;
    model.descripcion = null;
    model.activo = null;
    model.id = id;
    await this.cs.HttpGet(model, '/catalogos/rolweb/' + model.id).subscribe(data => {
      pp1 = data as unknown as RolWebModel[];
    }, error => {
        this.mostrarMensaje('Ocurrió un error al obtener la información');
      });
  }
  async deshabilitar(id: number) {
    let model: RolWebModel;
    model = new RolWebModel({});
    model.id = id;
    model.activo = false;
    this.changeD.detectChanges();
    this.cs.HttpDelete(model, '/catalogos/rolweb/' + id).subscribe(async data => {
      this.mostrarMensaje('Deshabilitado correctamente');
      this.progressBar = true;
      await this.showAllRW();
    }, error => {
        this.mostrarMensaje('Ocurrio un problema al deshabilitar el registro');
      });

  }

  async habilitar(id: number) {
    let componente = this;
    let model: RolWebModel;
    model = new RolWebModel({});
    model.id = id;
    model.nombre = null;
    model.descripcion = null;
    model.activo = true;
    componente.changeD.detectChanges();
    this.cs.HttpPut(model, '/catalogos/rolweb/' + model.id).subscribe(async data => {
      this.mostrarMensaje('Habilitado correctamente');
      this.progressBar = true;
      await this.showAllRW();
    }, error => {
        this.mostrarMensaje('Ocurrió un problema al habilitar el registro');
      });


  }

  filtrar(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();
    }
  }
  //#endregion
}
