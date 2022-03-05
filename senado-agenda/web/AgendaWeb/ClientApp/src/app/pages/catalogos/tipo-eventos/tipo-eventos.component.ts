import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TipoEventosFormComponent } from "./tipo-eventos-form/tipo-eventos-form.component";
import { FormGroup } from "@angular/forms";
import { modelTipoEvento } from '../../../models/modelTipoEvento'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { CatalogosService } from '../../../services/catalogos.service';

@Component({
    selector: 'app-tipo-eventos',
    templateUrl: './tipo-eventos.component.html',
    styleUrls: ['./tipo-eventos.component.scss']
})

export class TipoEventosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource<modelTipoEvento>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  tipoEventos: modelTipoEvento;
  dialogo: any;
  progressBar = true;
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';

  constructor(private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cs: CatalogosService) { }

  ngOnInit() {
    this.showAlltipoEventos();
  }
  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical
    });
  }

  agregarTipoEvento(): void {

    this.dialogo = this._matDialog.open(TipoEventosFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });

    this.dialogo.afterClosed().subscribe((response: FormGroup) => {
       this.showAlltipoEventos();
      if (!response) {
        return;
      }

    });
  }
  modificar(element: modelTipoEvento): void {

    this.dialogo = this._matDialog.open(TipoEventosFormComponent, {
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
      await this.showAlltipoEventos();
      if (!response) {
        return;
      }
    });
  }
  async showAlltipoEventos() {
    await this.cs.Httpget('/catalogos/tipoevento')
      .subscribe((tempdate) => {
        this.dataSource.data = tempdate as modelTipoEvento[];
        this.progressBar = false;
        this.dataSource.paginator = this.paginator;
        this.changePage();

      });
  }
  async deshabilitar(id: number) {
    let model: modelTipoEvento;
    model = new modelTipoEvento({});
    model.id = id;
    this.cs.HttpDelete(model, '/catalogos/tipoevento/' + id).subscribe(data => {
    });
    this.mostrarMensaje('Deshabilitado correctamente');
    this.showAlltipoEventos();
  }
  async habilitar(element: modelTipoEvento) {
    let model: modelTipoEvento;
    model = new modelTipoEvento({});
    model.id = element.id;
    model.nombre = null;
    model.descripcion = null;
    model.activo = true;
    this.cs.HttpPut(model, '/catalogos/tipoevento/' + model.id).subscribe(data => {
    });
    this.mostrarMensaje('Habilitado correctamente');
    this.showAlltipoEventos();
  }


  changePage() {

    setTimeout(function () {

    }, 200);

  }

 
}
