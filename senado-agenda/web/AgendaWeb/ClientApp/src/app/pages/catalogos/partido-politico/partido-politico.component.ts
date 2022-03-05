import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartidoPoliticoFormComponent } from './partido-politico-form/partido-politico-form.component';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { CatalogosService } from '../../../services/catalogos.service';
import { Config } from 'protractor';
import { PartidoPoliticoModel } from '../../../models/partido-politico.model';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-partido-politico',
  templateUrl: './partido-politico.component.html',
  styleUrls: ['./partido-politico.component.scss']
})
export class PartidoPoliticoComponent implements OnInit {
  //#region variables
  ListPP: PartidoPoliticoModel[];
  displayedColumns: string[] = ['nombre',  'siglas','legislatura_nombre', 'opciones'];
  //dataSource = this.ListPP;
  dataSource = new MatTableDataSource<PartidoPoliticoModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dialogo: any;
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';
  progressBar = true;
  //#endregion
  constructor(
    private _matdialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cs: CatalogosService,
    private changeD: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.showAllPP();
    this.show1PP(1);
  }
  //#region form
   agregarPP(): void {
    this.dialogo = this._matdialog.open(PartidoPoliticoFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });
    this.dialogo.afterClosed().subscribe(async(response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        this.progressBar = true;
        await this.showAllPP();
      } else if (response=='error') {
        this.mostrarMensaje('Ocurrió un error');
      }

      if (!response) {
        return;
      }
    });

  }
  modificarPP(element: PartidoPoliticoModel): void {

    this.dialogo = this._matdialog.open(PartidoPoliticoFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        this.progressBar = true;
        await this.showAllPP();
      } else if(response=='error') {
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
  async showAllPP() {
    let pp: Observable<PartidoPoliticoModel[]>;
    await this.cs.Httpget('/catalogos/partidopolitico').subscribe(data => {

      this.dataSource = new MatTableDataSource(data as PartidoPoliticoModel[]);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.changeD.detectChanges();
      this.progressBar = false;
    }, error => {
        this.mostrarMensaje('Ocurrió un error al obtener la información');
      });
  }
  async show1PP(id: number) {
    let pp1: PartidoPoliticoModel[];
    let model: PartidoPoliticoModel;
    model = new PartidoPoliticoModel({});
    model.nombre = null;
    model.siglas = null;
    model.activo = null;
    model.id = id;
    await this.cs.HttpGet(model, '/catalogos/partidopolitico/' + model.id).subscribe(data => {
      pp1 = data as unknown as PartidoPoliticoModel[];

    }, error => {

        this.mostrarMensaje('Ocurrió un error al obtener la información');
      });
  }
  async deshabilitar(id: number) {
    let model: PartidoPoliticoModel;
    model = new PartidoPoliticoModel({});
    model.id = id;
    model.id_legislatura = null;
    model.activo = false;
    this.changeD.detectChanges();
    this.cs.HttpDelete(model, '/catalogos/partidopolitico/'+id).subscribe(async data => {
     this.mostrarMensaje('Deshabilitado correctamente');
      this.progressBar = true;
      await this.showAllPP();
    }, error => {
        this.mostrarMensaje('Ocurrió un error al deshabilitar el registro');
      });


  }
  async habilitar(element: PartidoPoliticoModel) {
    let model: PartidoPoliticoModel;
    model = new PartidoPoliticoModel({});
    model.id = element.id;
    model.nombre = null;
    model.siglas = null;
    model.activo = true;
    model.id_legislatura = null;
    this.changeD.detectChanges();
    this.cs.HttpPut(model, '/catalogos/partidopolitico/' + model.id).subscribe(async data => {
      this.mostrarMensaje('Habilitado correctamente');
      this.progressBar = true;
      await this.showAllPP();
    }, error => {
       this.mostrarMensaje('Ocurrió un error al habilitar el registro');
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
