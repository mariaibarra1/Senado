import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { CatalogosService } from '../../../services/catalogos.service';
import { LegislaturaFormComponent } from './legislatura-form/legislatura-form.component';
import { modelLegislatura } from '../../../models/modelLegislatura';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
    selector: 'app-legislaturas',
    templateUrl: './legislaturas.component.html',
    styleUrls: ['./legislaturas.component.scss']
})

export class LegislaturasComponent implements OnInit {

    displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'opciones'];
    dataSource = new MatTableDataSource<modelLegislatura>();
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    equipamiento: modelLegislatura
    dialogo: any;

    snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
    snackBarVertical: MatSnackBarVerticalPosition = 'top';
    constructor(
      private _matDialog: MatDialog,
      private _snackBar: MatSnackBar,
      private cs: CatalogosService
      ) {
    }
    ngOnInit() {
      this.showAllLegislaturas();
  }

      agregarLegislatura(): void {

        this.dialogo = this._matDialog.open(LegislaturaFormComponent, {
          panelClass: 'form-dialog',
          data: {
            action: 'nuevo'
          }
        });

        this.dialogo.afterClosed().subscribe(async (response: string) => {
          if (response == 'success') {
            this.mostrarMensaje('Operación correcta');
          } else {
            this.mostrarMensaje('Ocurrió un error');
          }
          await this.showAllLegislaturas();

          if (!response) {

            return;
          }

        });
      }
      EditarLegislatura(legislatura): void {

        this.dialogo = this._matDialog.open(LegislaturaFormComponent, {
          panelClass: 'form-dialog',
          data: {
            action: 'editar',
            legislatura: legislatura
          }
        });

        this.dialogo.afterClosed().subscribe(async (response: string) => {
          if (response == 'success') {
            this.mostrarMensaje('Operación correcta');
          } else {
            this.mostrarMensaje('Ocurrió un error');
          }

          await this.showAllLegislaturas();

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

    async showAllLegislaturas() {

      await this.cs.Httpget('/catalogos/legislatura').subscribe(data => {
        this.dataSource.data = data as modelLegislatura[];
        this.dataSource.paginator = this.paginator;
      });
  }
      async deshabilitar(id: number) {
        console.log(id);
        let model: modelLegislatura;
        model = new modelLegislatura({});
        model.id = id;
        this.cs.HttpDelete(model, '/catalogos/legislatura/' + id).subscribe(data => {
          console.log(data);
        });
        this.mostrarMensaje('Deshabilitado correctamente');
        this.showAllLegislaturas();
      }
       async habilitar(element: modelLegislatura) {
        console.log(element);
        let model: modelLegislatura;
        model = new modelLegislatura({});
        model.id = element.id;
        model.nombre = null;
        model.descripcion = null;
        model.activo = true;
         this.cs.HttpPut(model, '/catalogos/legislatura/' + model.id).subscribe(data => {
          console.log(data);
        });
        this.mostrarMensaje('Habilitado correctamente');
        this.showAllLegislaturas();
      }

      changePage() {
        setTimeout(function () { }, 200);
      }
}
