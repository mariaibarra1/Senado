import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RolSenadoFormComponent} from "./rol-senado-form/rol-senado-form.component";
import { FormGroup } from "@angular/forms";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { CatalogosService } from '../../../services/catalogos.service';
import { RolSenadoModel } from '../../../models/rol-senado.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}



@Component({
    selector: 'app-rol-senado',
    templateUrl: './rol-senado.component.html',
    styleUrls: ['./rol-senado.component.scss']
})
export class RolSenadoComponent implements OnInit {

    ListaRoles: RolSenadoModel[];
    displayedColumns: string[] = ['nombre', 'descripcion', 'opciones'];
    dataSource = new MatTableDataSource<RolSenadoModel>();
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
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
        this.showAllRolSenado();
    }

    /**
    * Agregar Rol Senado
    */
    agregarRolSenado(): void {

        this.dialogo = this._matDialog.open(RolSenadoFormComponent, {
            panelClass: 'form-dialog',
            data: {
                action: 'nuevo'
            }
        });

        this.dialogo.afterClosed().subscribe(async (response: any) => {
            console.log(response);
            if (!response) {
                return;
            }
            if (response == 'success') {
                this.mostrarMensaje('Operación correcta');
            } else {
                this.mostrarMensaje('Ocurrió un error');
            }
            await this.showAllRolSenado();


        });
    }
    /**
* Editar Rol Senado
*/
    editarRolSenado(element: RolSenadoModel): void {

        this.dialogo = this._matDialog.open(RolSenadoFormComponent, {
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
            await this.showAllRolSenado();

        });
    }

    mostrarMensaje(mensaje: string) {

        this._snackBar.open(mensaje, 'Cerrar', {
            duration: 5000,
            horizontalPosition: this.snackBarHorizontal,
            verticalPosition: this.snackBarVertical,
        });

    }

    async showAllRolSenado() {
        await this.catalogosService.Httpget('/catalogos/rolsenado/').subscribe(async data => {
            if (data.length > 0) {
                this.dataSource.data = data as RolSenadoModel[];
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.changePage();
                await this.delay(2000);
                this.progressBar = false;
            } else {
                this.dataSource.data = data as RolSenadoModel[];
                await this.delay(2000);
                this.progressBar = false;
                this.mostrarMensaje("No existen elementos registrados");
            }
        }, async err => {
            this.mostrarMensaje("Ocurrió un error al obtener la información");
        });;
    }



    async habilitardeshabilitar(id: number, tipo: string) {
        let model: RolSenadoModel;
        model = new RolSenadoModel({});
        model.id = id;
        this.catalogosService.HttpDelete(model, '/catalogos/rolsenado/' + id).subscribe(async data => {

            this.showAllRolSenado();
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
