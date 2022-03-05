import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GpoParlamentarioFormComponent} from "./gpo-parlamentario-form/gpo-parlamentario-form.component";
import {FormGroup} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {CatalogosService} from '../../../services/catalogos.service';
import {GpoParlamentarioModel} from '../../../models/gpo-parlamentario.model';
import {PartidoPoliticoModel} from '../../../models/partido-politico.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {RelGrupoPartidoModel} from '../../../models/relGrupoPartido.model';
import * as lodash from 'lodash';


export interface PeriodicElement {
  nombre: string;
  partidoPolitico: string;
  position: number;
}


@Component({
  selector: 'app-gpo-parlamentario',
  templateUrl: './gpo-parlamentario.component.html',
  styleUrls: ['./gpo-parlamentario.component.scss']
})
export class GpoParlamentarioComponent implements OnInit {

  ListaGrupo: GpoParlamentarioModel[];
  ListaPartidos: PartidoPoliticoModel[];
  ListaGpoPartido: GpoParlamentarioModel[];
  ListaPartido: RelGrupoPartidoModel[];
  displayedColumns: string[] = ['nombre', 'nombre_partido', 'nombre_legislatura', 'opciones'];
  //dataSource = this.ListaGrupo;
  dataSource = new MatTableDataSource<GpoParlamentarioModel>();

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dialogo: any;
  progressBar = true;
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';


  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private catalogosService: CatalogosService
  ) {
  }

  ngOnInit() {
    this.showAllGpoParlamentario();
  }

  /**
   * Agregar Grupo Parlamentario
   */
  agregarGpoParlamentario(): void {

    this.dialogo = this._matDialog.open(GpoParlamentarioFormComponent, {
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
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
      await this.showAllGpoParlamentario();

    });
  }

  /**
   * Editar  Grupo Parlamentario
   */
  editarGpoParlamentario(element: GpoParlamentarioModel): void {

    this.dialogo = this._matDialog.open(GpoParlamentarioFormComponent, {
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
      } else {
        this.mostrarMensaje('Ocurrió un error');
      }
      await this.showAllGpoParlamentario();

    });
  }


  mostrarMensaje(mensaje: string) {

    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical,
    });

  }

  async showAllGpoParlamentario() {

    await this.catalogosService.Httpget('/catalogos/gpoparlamentario/').subscribe(
      async data => {

        let gposParlamentarios = [];

        lodash.forEach(lodash.groupBy(data as GpoParlamentarioModel[], 'id'), function (value, key) {

          let gpoParlamentario = new GpoParlamentarioModel(value[0]);

          value.forEach((value, index) => {

            gpoParlamentario.partidos.push(value.nombre_partido);
          });

          gposParlamentarios.push(gpoParlamentario);
        });

        this.dataSource = new MatTableDataSource(gposParlamentarios);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.progressBar = false;

      }, error => {

        this.mostrarMensaje('Ocurrió un error al obtener la información');
      });
  }

  async showGpoPartido() {
    await this.catalogosService.Httpget('/catalogos/gpoparlamentario/').subscribe(async data => {
      this.ListaGrupo = data as GpoParlamentarioModel[];
      let model: GpoParlamentarioModel;
      model = new GpoParlamentarioModel({});
      for (var i = 0; i < this.ListaGrupo.length; i++) {
        model.id = this.ListaGrupo[i].id;
        model.nombre = this.ListaGrupo[i].nombre;
        await this.catalogosService.Httpget('/catalogos/relgpopartido/' + model.id).subscribe(async data1 => {
          this.ListaPartido = data1 as RelGrupoPartidoModel[];
          let modelp = new RelGrupoPartidoModel({});
        });
      }
      this.dataSource.data = this.ListaGrupo;
      console.log(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //this.changeD.detectChanges();
      this.progressBar = false;

    }, error => {
      this.mostrarMensaje('Ocurrió un error al obtener la información');
    });
  }

  async habilitardeshabilitar(id: number, tipo: string) {
    let model: GpoParlamentarioModel;
    model = new GpoParlamentarioModel({});
    model.id = id;
    this.catalogosService.HttpDelete(model, '/catalogos/gpoparlamentario/' + id).subscribe(async data => {
      this.showAllGpoParlamentario();
      this.progressBar = true;
      if (tipo === 'desactivar') {
        this.mostrarMensaje('Deshabilitado correctamente');
      } else {
        this.mostrarMensaje('Habilitado correctamente');
      }
    }, async error => {
      this.mostrarMensaje('Ocurrió un error al ejecutar la acción');
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
