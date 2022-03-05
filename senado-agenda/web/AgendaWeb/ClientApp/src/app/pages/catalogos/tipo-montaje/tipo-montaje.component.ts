import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TipoMontajeFormComponent } from "./tipo-montaje-form/tipo-montaje-form.component";
import { FormGroup } from "@angular/forms";
import { modelTipoEquipamento } from '../../../models/modelTipoEquipamento'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { CatalogosService } from '../../../services/catalogos.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-tipo-montaje',
    templateUrl: './tipo-montaje.component.html',
    styleUrls: ['./tipo-montaje.component.scss']
})
export class TipoMontajeComponent implements OnInit {

    displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
    dataSource = new MatTableDataSource<modelTipoEquipamento>();
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    tipoEquipamiento: modelTipoEquipamento;
    dialogo: any;
    progressBar = true;
    snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
    snackBarVertical: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cs: CatalogosService) { }

  ngOnInit() {
    this.showAlltipoEquipamiento();
  }

  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: this.snackBarHorizontal,
      verticalPosition: this.snackBarVertical
    });
  }

  agregar(): void {

    this.dialogo = this._matDialog.open(TipoMontajeFormComponent, {
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
  async showAlltipoEquipamiento() {
    await this.cs.Httpget('/catalogos/tipoMontaje')
      .subscribe((tempdate) => {
        this.dataSource.data = tempdate as modelTipoEquipamento[];
        this.progressBar = false;
        this.dataSource.paginator = this.paginator;
        this.changePage();

      });
  }
  modificar(element: modelTipoEquipamento): void {

    this.dialogo = this._matDialog.open(TipoMontajeFormComponent, {
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
      await this.showAlltipoEquipamiento();
      if (!response) {
        return;
      }
    });
  }
  async deshabilitar(id: number) {
    let model: modelTipoEquipamento;
    model = new modelTipoEquipamento({});
    model.id = id;
    this.cs.HttpDelete(model, '/catalogos/tipoMontaje/' + id).subscribe(data => {
    });
    this.mostrarMensaje('Deshabilitado correctamente');
    this.showAlltipoEquipamiento();
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
    this.showAlltipoEquipamiento();
  }

  changePage() {

    setTimeout(function () {

    }, 200);

  }

}
