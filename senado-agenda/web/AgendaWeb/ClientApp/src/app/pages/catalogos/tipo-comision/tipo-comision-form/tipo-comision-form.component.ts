import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { modelComision } from "../../../../models/modelComision"
import { CatalogosService } from '../../../../services/catalogos.service';

@Component({
    selector: 'app-tipo-comision-form',
    templateUrl: './tipo-comision-form.component.html',
    styleUrls: ['./tipo-comision-form.component.scss']
})

export class TipoComisionFormComponent {
    accion: string;
    comision: modelComision;
    comisionForm: FormGroup;
    titulo: string;


  constructor(
    public dialogo: MatDialogRef<TipoComisionFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService) {
    this.accion = _data.action;

    if (this.accion === 'editar') {

      this.titulo = 'Editar servicio';
      this.comision = _data.model;

    } else {

      this.titulo = 'Nuevo servicio';
      this.comision = new modelComision({});
    }

    this.comisionForm = this.crearTipoComisionForm();
  }

  crearTipoComisionForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.comision.id],
      nombre: [this.comision.nombre],
      descripcion: [this.comision.descripcion],
    });
  }

  async agregar(data: FormGroup) {
    let modelo: modelComision;
    modelo = new modelComision({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(modelo, '/catalogos/tipoComision').subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

  async modificar(data: FormGroup) {
    let modelo: modelComision;
    modelo = new modelComision({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = null;
    await this.cs.HttpPut(modelo, '/catalogos/tipoComision/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }


}
