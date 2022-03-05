import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { UsuariosFormComponent } from '../usuarios/usuarios-form/usuarios-form.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { UsuarioModel } from '../../models/usuario.model';
import { GpoParlamentarioModel } from '../../models/gpo-parlamentario.model'
import { CatalogosService } from '../../services/catalogos.service';
import { RolWebModel } from '../../models/rol-web.model';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


  usuario: UsuarioModel;
  public lstusuario = [];
  displayedColumns: string[] = ['nombre', 'correo', 'telefono', 'extension', 'grp_parlamentario','opciones'];
  dataSource = new MatTableDataSource<UsuarioModel>();
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  progressBar = true;
  dialogo: any;
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
    private cs: CatalogosService

  ) {
  }
  ngOnInit() {
    this.showAllUsuarios()
  }


  agregarUsuario(): void {

    this.dialogo = this._matDialog.open(UsuariosFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'nuevo'
      }
    });

    this.dialogo.afterClosed().subscribe(async (response: string) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.showAllUsuarios();
      } else if (response == 'error') {
        this.mostrarMensaje('Ocurrió un error');
      }
      console.log(response);
      if (!response) {
        return;
      }
    });
  }
  Editarusuario(usuario): void {

    this.dialogo = this._matDialog.open(UsuariosFormComponent, {
      panelClass: 'form-dialog',
      data: {
        action: 'editar',
        usuario: usuario
      }
    });

    this.dialogo.afterClosed().subscribe(async (response: string) => {
      if (response == 'success') {
        this.mostrarMensaje('Operación correcta');
        await this.showAllUsuarios();
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
  //#endregion
  //#region service
  async showAllUsuarios() {

    await this.cs.Httpget('/usuarios/Usuarios').subscribe(data => {
      console.log(data);
      this.dataSource.data = data as UsuarioModel[]
      this.dataSource.paginator = this.paginator;
      this.progressBar = false;
    });
  }




  async deshabilitar(id: number) {
    console.log(id);
    let model: UsuarioModel;
    model = new UsuarioModel({});
    model.id = id;
    this.cs.HttpDelete(model, '/usuarios/Usuarios/' + id).subscribe(async data => {
      this.mostrarMensaje('Deshabilitado correctamente');
      this.progressBar = true;
      await this.showAllUsuarios();
    }, error => {
      this.mostrarMensaje('Ocurrió un error al deshabilitar el registro');
    });
  }
  async habilitar(element: UsuarioModel) {
    console.log(element);
    let modelo: UsuarioModel;
    modelo = new UsuarioModel({});
    modelo.id = element.id;
    modelo.nombre = element.nombre;
    modelo.apellido_paterno = element.apellido_paterno;
    modelo.apellido_materno = element.apellido_materno;
    modelo.id_rol_web = element.id_rol_web;
    modelo.correo_electronico = element.correo_electronico;
    modelo.id_gpo_parlamentario = element.id_gpo_parlamentario;
    modelo.activo = element.activo;
    modelo.telefono = element.telefono;
    modelo.extension = element.extension;
    modelo.activo = true;
    modelo.fecha_creacion = new Date;
    modelo.fecha_actualizacion = new Date;;

    this.cs.HttpPut(modelo, '/usuarios/Usuarios/' + modelo.id).subscribe(async data => {
      this.mostrarMensaje('Habilitado correctamente');
      this.progressBar = true;
      await this.showAllUsuarios();
    }, error => {
      this.mostrarMensaje('Ocurrió un error al habilitar el registro');
    });
  }
  changePage() {

    setTimeout(function () {

    }, 200);

  }
}
