import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { modelTipoEvento } from "../../../../models/modelTipoEvento";
import { CatalogosService } from '../../../../services/catalogos.service';

@Component({
    selector: 'app-tipo-eventos-form',
    templateUrl: './tipo-eventos-form.component.html',
    styleUrls: ['./tipo-eventos-form.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class TipoEventosFormComponent {

      accion: string;
      tipoEvento: modelTipoEvento;
      tipoEventoForm: FormGroup;
      titulo: string;

  constructor(
    public dialogo: MatDialogRef<TipoEventosFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService
  ) {

    this.accion = _data.action;

    if (this.accion === 'editar') {

      this.titulo = 'Editar tipo de evento';
      this.tipoEvento = _data.model;

    } else {

      this.titulo = 'Nuevo tipo de evento';
      this.tipoEvento = new modelTipoEvento({});
    }

    this.tipoEventoForm = this.crearTipoEventoForm();
  }

  crearTipoEventoForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.tipoEvento.id],
      nombre: [this.tipoEvento.nombre],
      descripcion: [this.tipoEvento.descripcion],
    });
  }

  //#region api
  async agregar(data: FormGroup) {
    let modelo: modelTipoEvento;
    modelo = new modelTipoEvento({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(modelo, '/catalogos/tipoevento').subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

  async modificar(data: FormGroup) {
    let modelo: modelTipoEvento;
    modelo = new modelTipoEvento({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = null;
    await this.cs.HttpPut(modelo, '/catalogos/tipoevento/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }
  //#endregi
}
