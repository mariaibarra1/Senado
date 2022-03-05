import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { modelTipoEquipamento } from "../../../../models/modelTipoEquipamento"
import { CatalogosService } from '../../../../services/catalogos.service';

@Component({
    selector: 'app-tipo-equipamento-form',
    templateUrl: './tipo-equipamento-form.component.html',
    styleUrls: ['./tipo-equipamento-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TipoEquipamentoFormComponent {
    accion: string;
    tipoEquipamiento: modelTipoEquipamento;
    tipoEquipamientoForm: FormGroup;
    titulo: string;

  constructor(
    public dialogo: MatDialogRef<TipoEquipamentoFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService) {
    this.accion = _data.action;

    if (this.accion === 'editar') {

      this.titulo = 'Editar servicio';
      this.tipoEquipamiento = _data.model;

    } else {

      this.titulo = 'Nuevo servicio';
      this.tipoEquipamiento = new modelTipoEquipamento({});
    }

    this.tipoEquipamientoForm = this.crearTipoEquipamientoForm();
  }

  crearTipoEquipamientoForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.tipoEquipamiento.id],
      nombre: [this.tipoEquipamiento.nombre],
      descripcion: [this.tipoEquipamiento.descripcion],
    });
  }

  async agregar(data: FormGroup) {
    let modelo: modelTipoEquipamento;
    modelo = new modelTipoEquipamento({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(modelo, '/catalogos/tipoEquipamiento').subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

  async modificar(data: FormGroup) {
    let modelo: modelTipoEquipamento;
    modelo = new modelTipoEquipamento({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = null;
    await this.cs.HttpPut(modelo, '/catalogos/tipoEquipamiento/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

}
