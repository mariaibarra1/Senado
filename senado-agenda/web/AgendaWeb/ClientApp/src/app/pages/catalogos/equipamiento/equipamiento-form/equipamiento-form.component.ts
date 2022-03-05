import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { EquipamientoModel } from '../../../../models/equipamiento.model';
import { CatalogosService } from '../../../../services/catalogos.service';
import { modelTipoEquipamento } from '../../../../models/modelTipoEquipamento';
import { modelEstatusEquipamento } from '../../../../models/estatusquipamientomodel';

@Component({
  selector: 'app-equipamiento-form',
  templateUrl: './equipamiento-form.component.html',
  styleUrls: ['./equipamiento-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EquipamientoFormComponent {

  //#region variables
  accion: string;
  Equipamiento: EquipamientoModel;
  EquipamientoForm: FormGroup;
  titulo: string;
  progressBar = true;
    listEstatusEquipamiento: modelEstatusEquipamento[] = [];
    listtipoEquipamiento: modelTipoEquipamento[] = [];
    idestatus: string;
    idtipo: string;
  //#endregion
  constructor(
    public dialogo: MatDialogRef<EquipamientoFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private formBuilder: FormBuilder,
    private cs: CatalogosService
  ) {
    this.accion = _data.action;

    if (this.accion === 'editar') {
      this.titulo = 'Editar equipamiento';
      this.Equipamiento = _data.equipamiento;
      this.idestatus = this.Equipamiento.id_estatus.toString();
      this.idtipo = this.Equipamiento.id_tipo.toString();

    } else {
      this.titulo = 'Nuevo equipamiento';
      this.Equipamiento = new EquipamientoModel({});
    }
    this.EquipamientoForm = this.crearEquipamientoForm();
  }

  crearEquipamientoForm(): FormGroup {


    return this.formBuilder.group({
      id: [this.Equipamiento.id],
      nombre: [this.Equipamiento.nombre],
      descripcion: [this.Equipamiento.descripcion],
      id_estatus: [this.Equipamiento.id_estatus],
      id_tipo:[this.Equipamiento.id_tipo]
    });
  }

  ngOnInit() {


    this.showallEstatusEquipamiento();
    this.showalltipoEquipamiento();
  }
  //#region api
  async agregarNuevo(data: FormGroup) {
    this.progressBar = true;
    let modelo: EquipamientoModel;
    modelo = new EquipamientoModel({});
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.id = 0;
    modelo.tipoOperacion = 0;
    modelo.activo = true;
    modelo.id_estatus = data.controls.id_estatus.value;
    modelo.id_tipo = data.controls.id_tipo.value
    await this.cs.HttpPost(modelo, '/catalogos/equipamiento').subscribe(data => {
   
      this.progressBar = false;
      this.dialogo.close('success');
    }, error => {

      this.progressBar = false;
      this.dialogo.close('error');
    });

  }

  async modificar(data: FormGroup) {
    this.progressBar = true;
    let modelo: EquipamientoModel;
    modelo = new EquipamientoModel({});


    modelo.id = data.controls.id.value;
    modelo.nombre = data.controls.nombre.value;
    modelo.descripcion = data.controls.descripcion.value;
    modelo.activo = false;
    modelo.tipoOperacion = 0;

    modelo.id_estatus = data.controls.id_estatus.value;
    modelo.id_tipo = data.controls.id_tipo.value
    await this.cs.HttpPut(modelo, '/catalogos/equipamiento/' + modelo.id).subscribe(data => {

      this.progressBar = false;
      this.dialogo.close('success');
    }, error => {

      this.progressBar = false;
      this.dialogo.close('error');
      });


  }

  async showalltipoEquipamiento() {
    await this.cs.Httpget('/catalogos/TipoEquipamiento').subscribe(data => {
      this.listtipoEquipamiento = data as modelTipoEquipamento[];
    })


  }

  async showallEstatusEquipamiento() {
    await this.cs.Httpget('/catalogos/EstatusEquipamento').subscribe(data => {
      this.listEstatusEquipamiento = data as modelEstatusEquipamento[];
    })


  }

}
