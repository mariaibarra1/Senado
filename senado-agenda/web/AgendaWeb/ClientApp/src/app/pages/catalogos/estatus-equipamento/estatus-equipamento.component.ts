import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstatusEquipamentoFormComponent } from './estatus-equipamento-form/estatus-equipamento-form.component';
import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { CatalogosService } from '../../../services/catalogos.service';
import { Config } from 'protractor';
import { modelEstatusEquipamiento } from '../../../models/modelEstatusEquipamiento';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-estatus-equipamento',
    templateUrl: './estatus-equipamento.component.html',
    styleUrls: ['./estatus-equipamento.component.scss']
})

export class EstatusEquipamentoComponent implements OnInit {

    //#region variables
    ListEquipamiento: modelEstatusEquipamiento[];
    displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];

    dataSource = new MatTableDataSource<modelEstatusEquipamiento>();
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    dialogo: any;
    snackBarHorizontal: MatSnackBarHorizontalPosition = 'right';
    snackBarVertical: MatSnackBarVerticalPosition = 'top';
    progressBar = true;

    constructor(
      private _matdialog: MatDialog,
      private _snackBar: MatSnackBar,
      private cs: CatalogosService
    ) { }

    ngOnInit() {
      
    }

  agregarEEquipamiento(): void {
    this.dialogo = this._matdialog.open(EstatusEquipamentoFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });
    this.dialogo.afterClosed().subscribe(async (response: any) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.showAllEEquipamento();
      } else if (response == 'error') {
        this.mostrarMensaje('Ocurrió un error');
      }
      if (!response) {
        return;
      }
    });
  }


      modificarEEquipamiento(element: EstatusEquipamentoFormComponent): void {
     
        this.dialogo = this._matdialog.open(EstatusEquipamentoFormComponent, {
          panelClass: 'form-dialog',
          data: {
            action: 'editar',
            model: element
          }
        });
        this.dialogo.afterClosed().subscribe(async (response: any) => {
          if (response == 'success') {
            this.mostrarMensaje('Operación correcta');
            await this.showAllEEquipamento();
          } else if (response == 'error') {
            this.mostrarMensaje('Ocurrió un error');
          }
          console.log(response);
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

      async showAllEEquipamento() {
            let pp: Observable<modelEstatusEquipamiento[]>;
        await this.cs.Httpget('/catalogos/EstatusEquipamento').subscribe(data => {
              this.ListEquipamiento = data as modelEstatusEquipamiento[];
              this.dataSource.data = this.ListEquipamiento;
              this.dataSource.paginator = this.paginator;
              this.progressBar = false;
            }, error => {
              this.mostrarMensaje('Ocurrió un error al obtener la información');
            });
  }

        async deshabilitar(id: number) {
          console.log(id);
          let model: modelEstatusEquipamiento;
          model = new modelEstatusEquipamiento({});
          model.id = id;
          this.cs.HttpDelete(model, '/catalogos/EstatusEquipamento/' + id).subscribe(async data => {
            this.mostrarMensaje('Deshabilitado correctamente');
            await this.showAllEEquipamento();
          }, error => {
            this.mostrarMensaje('Ocurrió un error al deshabilitar el registro');
          });


        }
        async habilitar(element: modelEstatusEquipamiento) {
          console.log(element);
          let model: modelEstatusEquipamiento;
          model = new modelEstatusEquipamiento({});
          model.id = element.id;
          model.nombre = null;
          model.descripcion = null;
          model.activo = true;
          this.cs.HttpPut(model, '/catalogos/EstatusEquipamento/' + model.id).subscribe(async data => {
            console.log(data);
            this.mostrarMensaje('Habilitado correctamente');
            await this.showAllEEquipamento();
          }, error => {
            console.log(error);
            this.mostrarMensaje('Ocurrió un error al habilitar el registro');
          });
        }




    
}
