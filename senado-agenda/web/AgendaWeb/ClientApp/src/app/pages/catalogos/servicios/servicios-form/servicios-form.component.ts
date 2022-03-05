import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { modelServicios } from "../../../../models/modelServicios"
import { CatalogosService } from '../../../../services/catalogos.service';

@Component({
    selector: 'app-servicios-form',
    templateUrl: './servicios-form.component.html',
   styleUrls: ['./servicios-form.component.scss'],
   encapsulation: ViewEncapsulation.None
})

export class ServiciosFormComponent {

  accion: string;
  servicio: modelServicios;
  servicioForm: FormGroup;
  titulo: string;

  constructor(
    public dialogo: MatDialogRef<ServiciosFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService) {
    this.accion = _data.action;

    if (this.accion === 'editar') {

      this.titulo = 'Editar servicio';
      this.servicio = _data.model;

    } else {

      this.titulo = 'Nuevo servicio';
      this.servicio = new modelServicios({});
    }

    this.servicioForm = this.crearServicioForm();
  }

  crearServicioForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.servicio.id],
      nombre: [this.servicio.nombre],
      descripcion: [this.servicio.descripcion],
    });
  }

  //#region api
  async agregar(data: FormGroup) {
    let modelo: modelServicios;
    modelo = new modelServicios({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    await this.cs.HttpPost(modelo, '/catalogos/servicios').subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }

  async modificar(data: FormGroup) {
    let modelo: modelServicios;
    modelo = new modelServicios({});
    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = null;
    await this.cs.HttpPut(modelo, '/catalogos/servicios/' + modelo.id).subscribe(data => {
      this.dialogo.close('success');
    });
    this.dialogo.close('success');
  }
  //#endregi
}
