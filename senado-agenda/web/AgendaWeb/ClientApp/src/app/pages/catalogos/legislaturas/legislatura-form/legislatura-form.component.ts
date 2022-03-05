import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { modelLegislatura } from "../../../../models/modelLegislatura"
import { CatalogosService } from '../../../../services/catalogos.service';

@Component({
    selector: 'app-legislatura-form',
    templateUrl: './legislatura-form.component.html',
    styleUrls: ['./legislatura-form.component.scss']
})

export class LegislaturaFormComponent {

  accion: string;
  legislatura: modelLegislatura;
  legislaturaForm: FormGroup;
  titulo: string;

  constructor(
    public dialogo: MatDialogRef<LegislaturaFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService) {
    this.accion = _data.action;

    if (this.accion === 'editar') {

      this.titulo = 'Editar servicio';
      this.legislatura = _data.model;

    } else {

      this.titulo = 'Nuevo servicio';
      this.legislatura = new modelLegislatura({});
    }

    this.legislaturaForm = this.crearLegislaturaForm();
  }

  crearLegislaturaForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.legislatura.id],
      nombre: [this.legislatura.nombre],
      descripcion: [this.legislatura.descripcion],
    });
  }

  async agregar(data: FormGroup) {
    let legislatura: modelLegislatura;
    legislatura = new modelLegislatura({});
    legislatura.nombre = data.controls.nombre.value;
    legislatura.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(legislatura, '/catalogos/legislatura').subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

  async modificar(data: FormGroup) {
    let legislatura: modelLegislatura;
    legislatura = new modelLegislatura({});
    legislatura.id = data.controls.id.value;
    legislatura.nombre = data.controls.nombre.value;
    legislatura.descripcion = data.controls.descripcion.value;
    legislatura.activo = null;
    await this.cs.HttpPut(legislatura, '/catalogos/legislatura/' + legislatura.id).subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }
}
