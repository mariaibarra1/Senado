import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { modelTipoMontaje } from "../../../../models/modelTipoMontaje";
import { CatalogosService } from '../../../../services/catalogos.service';


@Component({
    selector: 'app-tipo-montaje-form',
    templateUrl: './tipo-montaje-form.component.html',
    styleUrls: ['./tipo-montaje-form.component.scss'],
    encapsulation: ViewEncapsulation.None

})

export class TipoMontajeFormComponent {

    accion: string;
    tipoMontaje: modelTipoMontaje;
    tipoMontajeForm: FormGroup;
    titulo: string;

  constructor(
    public dialogo: MatDialogRef<TipoMontajeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService
    ) {

      this.accion = _data.action;

      if (this.accion === 'editar') {

        this.titulo = 'Editar espacio';
        this.tipoMontaje = _data.model;

      } else {

        this.titulo = 'Nuevo espacio';
        this.tipoMontaje = new modelTipoMontaje({});
      }

        this.tipoMontajeForm = this.crearTipoMontajeForm();
      }

      crearTipoMontajeForm(): FormGroup {
        return this.formBuilder.group({
          id: [this.tipoMontaje.id],
          nombre: [this.tipoMontaje.nombre],
          descripcion: [this.tipoMontaje.descripcion],
        });
  }

  async agregar(data: FormGroup) {
    let modelo: modelTipoMontaje;
    modelo = new modelTipoMontaje({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(modelo, '/catalogos/tipoMontaje').subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

  async modificar(data: FormGroup) {
    let modelo: modelTipoMontaje;
    modelo = new modelTipoMontaje({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = null;
    await this.cs.HttpPut(modelo, '/catalogos/tipoMontaje/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

}
