import { Component, OnInit, Inject, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolWebModel } from '../../../../models/rol-web.model';
import { CatalogosService } from '../../../../services/catalogos.service';

@Component({
  selector: 'app-rol-web-form',
  templateUrl: './rol-web-form.component.html',
  styleUrls: ['./rol-web-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolWebFormComponent implements OnInit {
  //#region variables
  accion: string;
  rol: RolWebModel;
  rolForm: FormGroup;
  titulo: string;
  progressBar = false;
  //#endregion
  constructor(
    public dialogo: MatDialogRef<RolWebFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService
  ) {
    this.accion = _data.action;
    if (this.accion === 'editar') {
      this.titulo = 'Editar rol';
      this.rol = _data.model;
    } else {
      this.titulo = 'Nuevo rol';
      this.rol = new RolWebModel({});
    }
    this.rolForm = this.crearRolForm();
  }

  crearRolForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.rol.id],
      nombre: [this.rol.nombre],
      descripcion: [this.rol.descripcion],
    });
  }

  ngOnInit() {
  }
  //#region api
  async agregarNuevo(data: FormGroup) {
    let modelo: RolWebModel;
    modelo = new RolWebModel({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(modelo, '/catalogos/rolweb').subscribe(data => {
      this.dialogo.close('success');
    }, error => {
        this.progressBar = false;
        this.dialogo.close('error');
      });

  }
  async modificar(data: FormGroup) {
    let modelo: RolWebModel;
    modelo = new RolWebModel({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = null;
    await this.cs.HttpPut(modelo, '/catalogos/rolweb/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    }, error => {
        this.dialogo.close('error');
      });

  }
  //#endregion
}
