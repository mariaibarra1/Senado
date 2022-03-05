import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioModel } from '../../../models/usuario.model';
import { CatalogosService } from '../../../services/catalogos.service';
import { RolWebModel } from '../../../models/rol-web.model';
import { GpoParlamentarioModel } from '../../../models/gpo-parlamentario.model';
@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosFormComponent  {

  //#region variables
  accion: string;
  usuario: UsuarioModel;
  usuarioForm: FormGroup;
  titulo: string;
  progressBar = true;
  public idrol = "";
  public idgrpp = "";
  public ListGpoParlamentari: GpoParlamentarioModel[];
  public ListRW: RolWebModel[];

  //#endregion
  constructor(
    public dialogo: MatDialogRef<UsuariosFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService
  ) {
    this.accion = _data.action;
    if (this.accion === 'editar') {
      this.titulo = 'Editar Usuario';
      this.usuario = _data.usuario;

      this.idrol = this.usuario.id_rol_web.toString();
      this.idgrpp = this.usuario.id_gpo_parlamentario.toString();

    } else {
      this.titulo = 'Nuevo Usurio';
      this.usuario = new UsuarioModel({});
    }
    this.usuarioForm = this.crearUsuarioForm();
  }

  crearUsuarioForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.usuario.id],
      nombre: [this.usuario.nombre],
      apellidopaterno: [this.usuario.apellido_paterno],
      apellidomaterno: [this.usuario.apellido_materno],
      id_rol_web: [this.usuario.id_rol_web],
      correo_electronico: [this.usuario.correo_electronico],
      id_gpo_parlamentario: [this.usuario.id_gpo_parlamentario],
      fecha_actualizacion: [this.usuario.fecha_actualizacion],
      fecha_creacion: [this.usuario.fecha_creacion],
      activo: [this.usuario.activo],
      telefono: [this.usuario.telefono],
      extension: [this.usuario.extension],

    });
  }

  ngOnInit() {
    this.showAllGPOP();
    this.showAllROLWEB();
  }
  //#region api
  async agregarNuevo(data: FormGroup) {
    debugger;
    let modelo: UsuarioModel;
    modelo = new UsuarioModel({});
    modelo.nombre = data.controls.nombre.value;
    modelo.apellido_paterno = data.controls.apellidopaterno.value;
    modelo.apellido_materno = data.controls.apellidomaterno.value;
    modelo.id_rol_web = data.controls.id_rol_web.value;
    modelo.correo_electronico = data.controls.correo_electronico.value;
    modelo.id_gpo_parlamentario = 1;
    modelo.activo = data.controls.activo.value;
    modelo.telefono = data.controls.telefono.value;
    modelo.extension = data.controls.extension.value;
    await this.cs.HttpPost(modelo, '/usuarios/Usuarios').subscribe(data => {
      console.log(data);
      this.progressBar = false;
      this.dialogo.close('success');
    }, error => {
      console.log(error);
      this.progressBar = false;
      this.dialogo.close('error');
    });
  }

  async modificar(data: FormGroup) {

    let modelo: UsuarioModel;
    modelo = new UsuarioModel({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.apellido_paterno = data.controls.apellidopaterno.value;
    modelo.apellido_materno = data.controls.apellidomaterno.value;
    modelo.id_rol_web = data.controls.id_rol_web.value;
    modelo.correo_electronico = data.controls.correo_electronico.value;
    modelo.id_gpo_parlamentario = data.controls.id_gpo_parlamentario.value;
    modelo.activo = data.controls.activo.value;
    modelo.telefono = data.controls.telefono.value;
    modelo.extension = data.controls.extension.value;
    modelo.activo = true;
    modelo.fecha_creacion = new Date;
    modelo.fecha_actualizacion = new Date;;
    console.log(modelo);
    await this.cs.HttpPut(modelo, '/usuarios/Usuarios/' + modelo.id).subscribe(async data => {
      console.log(data);
      this.progressBar = false;
      this.dialogo.close('success');
    }, error => {
      console.log(error);
      this.progressBar = false;
      this.dialogo.close('error');
    });
  }
  async showAllROLWEB() {

    await this.cs.Httpget('/catalogos/RolWeb').subscribe(data => {
      console.log(data);

      this.ListRW = data as RolWebModel[];

    });
  }

  async showAllGPOP() {

    await this.cs.Httpget('/catalogos/GpoParlamentario').subscribe(data => {
      console.log(data);

      this.ListGpoParlamentari = data as GpoParlamentarioModel[];

    });
  }

}
