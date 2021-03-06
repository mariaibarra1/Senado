import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TipoEquipamentoFormComponent } from "./tipo-equipamento-form/tipo-equipamento-form.component";
import { FormGroup } from "@angular/forms";
import { modelTipoEquipamento } from '../../../models/modelTipoEquipamento'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { CatalogosService } from '../../../services/catalogos.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tipo-equipamento',
    templateUrl: './tipo-equipamento.component.html',
    styleUrls: ['./tipo-equipamento.component.scss']
})

export class TipoEquipamentoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource<modelTipoEquipamento>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  tipoEquipamento: modelTipoEquipamento;
  dialogo: any;
  progressBar = true;
  snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
  snackBarVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cs: CatalogosService) { }

  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical
    });
  }

  ngOnInit() {
    this.showAllServicios();
  }

  agregarServicio(): void {

    this.dialogo = this._matDialog.open(TipoEquipamentoFormComponent, {
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
    await this.cs.Httpget('/catalogos/tipoEquipamiento')
      .subscribe((tempdate) => {
        this.dataSource.data = tempdate as modelTipoEquipamento[];
        this.progressBar = false;
        this.dataSource.paginator = this.paginator;
        this.changePage();

      });
  }
  modificar(element: modelTipoEquipamento): void {

    this.dialogo = this._matDialog.open(TipoEquipamentoFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        model: element
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operaci??n correcta');
      } else {
        this.mostrarMensaje('Ocurri?? un error');
      }
      await this.showAllServicios();
      if (!response) {
        return;
      }
    });
  }
  async deshabilitar(id: number) {
    let model: modelTipoEquipamento;
    model = new modelTipoEquipamento({});
    model.id = id;
    this.cs.HttpDelete(model, '/catalogos/tipoEquipamiento/' + id).subscribe(data => {
    });
    this.mostrarMensaje('Deshabilitado correctamente');
    this.showAllServicios();
  }
  async habilitar(element: modelTipoEquipamento) {
    let model: modelTipoEquipamento;
    model = new modelTipoEquipamento({});
    model.id = element.id;
    model.nombre = null;
    model.descripcion = null;
    model.activo = true;
    this.cs.HttpPut(model, '/catalogos/tipoEquipamiento/' + model.id).subscribe(data => {
    });
    this.mostrarMensaje('Habilitado correctamente');
    this.showAllServicios();
  }

  changePage() {

    setTimeout(function () {

    }, 200);

  }

}
